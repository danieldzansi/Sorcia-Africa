import { sendContactEmail } from "../utils/gmail.js";

export const contactSupport = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      productcart,
      quantity,
      country,
      message,
    } = req.body;

    const result = await sendContactEmail({
      fullName,
      email,
      phone,
      productcart,
      quantity,
      country,
      message,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Support request sent successfully",
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