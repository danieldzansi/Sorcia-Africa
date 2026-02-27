import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendContactEmail = async ({
  fullName,
  email,
  phone,
  description,
}) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "support@sorciaafrica.com",
    subject: "New Contact Form Submission",
    text: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nDescription: ${description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
