"use server";

import { Resend } from "resend";
import {
  type ContactActionState,
  type ContactEmailConfig,
  type ContactEmailPayload,
  handleContactSubmission,
} from "@/lib/contact";

let resendClient: Resend | null = null;
let resendApiKey: string | null = null;

function getResend(apiKey: string) {
  if (!resendClient || resendApiKey !== apiKey) {
    resendClient = new Resend(apiKey);
    resendApiKey = apiKey;
  }

  return resendClient;
}

async function sendWithResend(
  payload: ContactEmailPayload,
  config: ContactEmailConfig,
) {
  const resend = getResend(config.apiKey);
  const { error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendContactInquiry(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  return handleContactSubmission(formData, process.env, sendWithResend);
}
