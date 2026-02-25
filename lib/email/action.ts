"use server"
import {
  alertConfirmationEmail,
  type AlertConfirmationEmailProps,
} from "@/lib/email/alertConfirmation";

export interface NotifyUserProps extends AlertConfirmationEmailProps {
  email: string;
}

import { sendEmail } from "./sendEmail";

export async function notifyUser(emailData: NotifyUserProps) {
  const subject = `🎯 Alert set! We're hunting for deals.`;
  const html = alertConfirmationEmail(emailData);
  const to = emailData.email;
  await sendEmail({ to, subject, html });
}
