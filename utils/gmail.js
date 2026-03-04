import nodemailer from "nodemailer";
import crypto from "crypto";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

export const sendContactEmail = async ({
  fullName,
  email,
  phone,
  productCategory,
  quantity,
  country,
  message,
}) => {
  const mailOptions = {
    from: `"Sorcia Africa Website" <${process.env.GMAIL_USER}>`,
    to: "support@sorciaafrica.com",
    subject: "New Product Request Submission",
    text: `
New Product Request

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Product: ${productCategory}
Quantity: ${quantity}
Country: ${country}
Message:${message}
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const id = `SR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    return { success: true, id };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message || error };
  }
};
