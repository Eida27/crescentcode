import { z } from "zod";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type ContactInquiry = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export type ContactEmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

export type ContactEmailPayload = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

export type ContactEmailSender = (
  payload: ContactEmailPayload,
  config: ContactEmailConfig,
) => Promise<void>;

type ContactFormParseResult =
  | { success: true; data: ContactInquiry }
  | { success: false; state: ContactActionState; skipSend?: boolean };

type ContactConfigResult =
  | { success: true; config: ContactEmailConfig }
  | { success: false; state: ContactActionState };

const directEmail = "anulabac30@gmail.com";
const successMessage = "Thanks. Your inquiry has been received.";
const emailAddress = z.email();

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z
    .string()
    .trim()
    .refine((value) => value.length > 0, "Please enter your email.")
    .refine(
      (value) => value.length === 0 || emailAddress.safeParse(value).success,
      "Please enter a valid email address.",
    ),
  projectType: z
    .string()
    .trim()
    .min(1, "Please choose a project type."),
  message: z
    .string()
    .trim()
    .min(1, "Please tell me about your project."),
});

export const initialContactState: ContactActionState = {
  status: "idle",
  message: "",
};

export function parseContactFormData(
  formData: FormData,
): ContactFormParseResult {
  const honeypot = getStringValue(formData, "website").trim();

  if (honeypot.length > 0) {
    return {
      success: false,
      state: {
        status: "success",
        message: successMessage,
      },
      skipSend: true,
    };
  }

  const parsed = contactSchema.safeParse({
    name: getStringValue(formData, "name"),
    email: getStringValue(formData, "email"),
    projectType: getStringValue(formData, "projectType"),
    message: getStringValue(formData, "message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      state: {
        status: "error",
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}

export function resolveContactEmailConfig(
  env: Record<string, string | undefined>,
): ContactConfigResult {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return {
      success: false,
      state: {
        status: "error",
        message:
          `Contact form is not configured yet. Please email ${directEmail} directly.`,
      },
    };
  }

  return {
    success: true,
    config: {
      apiKey,
      to,
      from,
    },
  };
}

export function buildContactEmailPayload(
  inquiry: ContactInquiry,
  config: Pick<ContactEmailConfig, "to" | "from">,
): ContactEmailPayload {
  const safeInquiry = {
    name: escapeHtml(inquiry.name),
    email: escapeHtml(inquiry.email),
    projectType: escapeHtml(inquiry.projectType),
    message: escapeHtml(inquiry.message).replace(/\n/g, "<br />"),
  };

  return {
    from: config.from,
    to: [config.to],
    replyTo: inquiry.email,
    subject: `New Crescent Code inquiry: ${inquiry.projectType}`,
    text: [
      "New Crescent Code inquiry",
      "",
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Project type: ${inquiry.projectType}`,
      "",
      inquiry.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h1 style="font-size: 22px; margin: 0 0 16px;">New Crescent Code inquiry</h1>
        <p><strong>Name:</strong> ${safeInquiry.name}</p>
        <p><strong>Email:</strong> ${safeInquiry.email}</p>
        <p><strong>Project type:</strong> ${safeInquiry.projectType}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p>${safeInquiry.message}</p>
        </div>
      </div>
    `.trim(),
  };
}

export async function handleContactSubmission(
  formData: FormData,
  env: Record<string, string | undefined>,
  sendEmail: ContactEmailSender,
): Promise<ContactActionState> {
  const parsed = parseContactFormData(formData);

  if (!parsed.success) {
    return parsed.state;
  }

  const configResult = resolveContactEmailConfig(env);

  if (!configResult.success) {
    return configResult.state;
  }

  try {
    await sendEmail(
      buildContactEmailPayload(parsed.data, configResult.config),
      configResult.config,
    );

    return {
      status: "success",
      message: successMessage,
    };
  } catch {
    return {
      status: "error",
      message:
        `Something went wrong while sending your inquiry. Please email ${directEmail} directly.`,
    };
  }
}

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}
