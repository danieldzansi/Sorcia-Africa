import resend from "../config/resend.js";
import "dotenv/config";

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
