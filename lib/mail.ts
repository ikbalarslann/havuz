import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "info@havuzvehavuz.com",
    to: email,
    subject: "Reset your password",
    html: `
    <div
    style="
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #c1e3f9;
      border-radius: 5px;
    "
  >
    <h2 style="color: #3498db">Forgot Password</h2>
    <p style="font-size: 16px; color: #555; margin-bottom: 20px">
       Please click the link below to reset your password.
    </p>
    <a
      href="${resetLink}"
      style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      "
    >
      Reset Password
    </a>
  </div>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "info@havuzvehavuz.com",
    to: email,
    subject: "Confirm Your Email",
    html: `
    <div
    style="
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #c1e3f9;
      border-radius: 5px;
    "
  >
    <h2 style="color: #3498db">Confirm Your Email</h2>
    <p style="font-size: 16px; color: #555; margin-bottom: 20px">
      Thank you for signing up! Please click the link below to confirm your
      email address:
    </p>
    <a
      href="${confirmLink}"
      style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      "
    >
      Confirm Email
    </a>
  </div>
    `,
  });
};
