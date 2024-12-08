import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Example: Gmail SMTP server
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Define the email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Welcome to Anonymous Feedback!</h2>
        <p>Hi ${username},</p>
        <p>Thank you for signing up! Your verification code is:</p>
        <h3 style="color: #007BFF;">${verifyCode}</h3>
        <p>Please enter this code on the verification page to complete your signup.</p>
        <p>Best regards,</p>
        <p>The Anonymous Feedback Team</p>
      </div>
    `;

    // Sending the email
    const info = await transporter.sendMail({
      from: "vasugambhir15@gmai.com", // Sender address
      to: email, // Receiver's email
      subject: "Anonymous Review Verification Code", // Subject line
      html: htmlContent, // Email content (HTML)
    });

    console.log("Email sent successfully:", info.messageId);
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}

// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     const response = await resend.emails.send({
//       from: "vasugambhir15@gmail.com",
//       to: email,
//       subject: "Anonymous Review Verification Code",
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
//     return { success: true, message: "Verification email sent successfully" };
//   } catch (emailError) {
//     console.error("Error sending verification email", emailError);
//     return { success: false, message: "Failed to send verification email" };
//   }
// }
