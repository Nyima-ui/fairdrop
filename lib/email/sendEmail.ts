import "server-only";
import { google } from "googleapis";
import { SendEmailProps } from "@/types/component";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const encodedSubject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;

  const message = [
    `From: FairDrop <ntenzin492@gmail.com>`,
    `To: ${to}`,
    `Subject: ${encodedSubject}`,
    "MIME-version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    html,
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });
}
