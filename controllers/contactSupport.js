import { sendContactEmail } from "../utils/resendEmail.js";
import { sendTelegramNotification } from "../utils/telegram.js";

export const contactSupport = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      productCategory,
      quantity,
      country,
      message,
    } = req.body;

    const result = await sendContactEmail({
      fullName,
      email,
      phone,
      productCategory,
      quantity,
      country,
      message,
    });

    sendTelegramNotification({
      customMessage: `NEW CONTACT FORM\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "—"}\nCategory: ${productCategory}\nQty: ${quantity}\nCountry: ${country}\nMessage: ${message}`,
    }).catch((err) => console.error("Telegram notify error:", err));

    if (result.success) {
      return res.status(200).json({
        success: true,
        message:
          "Thank you! We've received your message and will respond within 24–48 hours.",
        id: result.id,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to send support request",
      error: result.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
