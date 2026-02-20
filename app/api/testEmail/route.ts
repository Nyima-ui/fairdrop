import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendEmail";

export async function GET() {
  try {
    const to = "ntenzin492@gmail.com";
    const subject = "we are cool";
    const html =
      "<h2>Always remember this</h2><p>Whenever you feel down, just remember we are the coolest bro's in the entire milky way </p>";
    await sendEmail({ to, subject, html });
    return NextResponse.json({ message: "email send successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
