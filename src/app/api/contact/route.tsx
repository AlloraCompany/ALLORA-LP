import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GM_USER_EMAIL,
      clientId: process.env.GM_CLIENT_ID,
      clientSecret: process.env.GM_CLIENT_SECRET,
      refreshToken: process.env.GM_REFRESH_TOKEN,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contato do site" <${process.env.GM_USER_EMAIL}>`,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email?.toString(),
      subject: `[SITE] Contato de: ${email} ${company ? `(${company})` : ""}`,
      html: `
        <p><b>Nome:</b> ${name} </p>
        <p><b>Email:</b> ${email} </p>
        <p><b>Empresa:</b> ${company ? company : "Indisponível"} </p>
        <p><b>Telefone:</b> ${phone ? phone : "Indisponível"} </p>
        <p><b>Message:</b> ${message} </p>
        `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "COULD NOT SEND MESSAGE" }),
      { status: 500 }
    );
  }
}
