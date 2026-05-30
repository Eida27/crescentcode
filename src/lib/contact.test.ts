import { describe, expect, it, vi } from "vitest";
import {
  buildContactEmailPayload,
  handleContactSubmission,
  parseContactFormData,
  resolveContactEmailConfig,
} from "./contact";

function makeFormData(fields: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }

  return formData;
}

const completeFields = {
  name: "  Anula Bacalso  ",
  email: "  anula@example.com  ",
  projectType: "Business website",
  message: "  I need a polished website for my services.  ",
  website: "",
};

const completeEnv = {
  RESEND_API_KEY: "test_resend_key",
  CONTACT_TO_EMAIL: "anulabac30@gmail.com",
  CONTACT_FROM_EMAIL: "Crescent Code <hello@example.com>",
};

describe("parseContactFormData", () => {
  it("returns field errors when required fields are missing", () => {
    const result = parseContactFormData(makeFormData({ website: "" }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.state.status).toBe("error");
      expect(result.state.fieldErrors).toMatchObject({
        name: ["Please enter your name."],
        email: ["Please enter your email."],
        projectType: ["Please choose a project type."],
        message: ["Please tell me about your project."],
      });
    }
  });

  it("rejects invalid email addresses", () => {
    const result = parseContactFormData(
      makeFormData({ ...completeFields, email: "not-an-email" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.state.fieldErrors?.email).toEqual([
        "Please enter a valid email address.",
      ]);
    }
  });

  it("returns trimmed contact inquiry data for valid input", () => {
    const result = parseContactFormData(makeFormData(completeFields));

    expect(result).toEqual({
      success: true,
      data: {
        name: "Anula Bacalso",
        email: "anula@example.com",
        projectType: "Business website",
        message: "I need a polished website for my services.",
      },
    });
  });

  it("rejects honeypot submissions without exposing an error to the visitor", () => {
    const result = parseContactFormData(
      makeFormData({ ...completeFields, website: "bot-filled-field" }),
    );

    expect(result).toEqual({
      success: false,
      state: {
        status: "success",
        message: "Thanks. Your inquiry has been received.",
      },
      skipSend: true,
    });
  });
});

describe("contact email helpers", () => {
  it("returns an error state when required email environment variables are missing", () => {
    const result = resolveContactEmailConfig({});

    expect(result).toEqual({
      success: false,
      state: {
        status: "error",
        message:
          "Contact form is not configured yet. Please email anulabac30@gmail.com directly.",
      },
    });
  });

  it("builds a replyable email payload for a valid inquiry", () => {
    const payload = buildContactEmailPayload(
      {
        name: "Anula Bacalso",
        email: "anula@example.com",
        projectType: "Business website",
        message: "I need a polished website for my services.",
      },
      {
        to: "anulabac30@gmail.com",
        from: "Crescent Code <hello@example.com>",
      },
    );

    expect(payload).toMatchObject({
      from: "Crescent Code <hello@example.com>",
      to: ["anulabac30@gmail.com"],
      replyTo: "anula@example.com",
      subject: "New Crescent Code inquiry: Business website",
    });
    expect(payload.text).toContain("Name: Anula Bacalso");
    expect(payload.text).toContain("Project type: Business website");
    expect(payload.html).toContain("I need a polished website");
  });
});

describe("handleContactSubmission", () => {
  it("does not send email when validation catches a honeypot submission", async () => {
    const sendEmail = vi.fn();

    const state = await handleContactSubmission(
      makeFormData({ ...completeFields, website: "bot-filled-field" }),
      completeEnv,
      sendEmail,
    );

    expect(state.status).toBe("success");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("fails closed when email configuration is missing", async () => {
    const sendEmail = vi.fn();

    const state = await handleContactSubmission(
      makeFormData(completeFields),
      {},
      sendEmail,
    );

    expect(state.status).toBe("error");
    expect(state.message).toContain("not configured");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns success only after the email sender resolves", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);

    const state = await handleContactSubmission(
      makeFormData(completeFields),
      completeEnv,
      sendEmail,
    );

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(state).toEqual({
      status: "success",
      message: "Thanks. Your inquiry has been received.",
    });
  });

  it("returns an error when the email sender rejects", async () => {
    const sendEmail = vi.fn().mockRejectedValue(new Error("provider failed"));

    const state = await handleContactSubmission(
      makeFormData(completeFields),
      completeEnv,
      sendEmail,
    );

    expect(state).toEqual({
      status: "error",
      message:
        "Something went wrong while sending your inquiry. Please email anulabac30@gmail.com directly.",
    });
  });
});
