import resend from "../config/resend.js";
import crypto from "crypto";
import "dotenv/config";

/**
 * Send a contact / support email via Resend.
 *
 * @param {Object} params
 * @param {string} params.fullName
 * @param {string} params.email
 * @param {string} [params.phone]
 * @param {string} params.productCategory
 * @param {string} params.quantity
 * @param {string} params.country
 * @param {string} params.message
 * @returns {Promise<{success: boolean, id?: string, error?: object}>}
 */
export const sendContactEmail = async ({
  fullName,
  email,
  phone,
  productCategory,
  quantity,
  country,
  message,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Sorcia Africa <hello@sorciaafrica.com>",
      to: "support@sorciaafrica.com",
      reply_to: email,
      subject: `New Contact Form Submission — ${productCategory}`,
      html: `
        <h2>New Contact / Support Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${fullName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Category</td><td style="padding:8px">${productCategory}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Quantity</td><td style="padding:8px">${quantity}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Country</td><td style="padding:8px">${country}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend contact email error:", error);
      return { success: false, error };
    }

    const id = `SR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    console.log("Contact email sent successfully:", data);
    return { success: true, id, data };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: error.message || error };
  }
};

/**
 * Send a quotation email to a customer via Resend.
 *
 * @param {Object} params
 * @param {string} params.to - Customer email address
 * @param {string} params.subject - Email subject line
 * @param {string} params.html - Rendered HTML email body
 * @returns {Promise<{success: boolean, data?: object, error?: object}>}
 */
export const sendQuotationEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Sorcia Africa <quotes@sorciaafrica.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error };
    }

    console.log("Quotation email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send quotation email:", error);
    return { success: false, error };
  }
};
