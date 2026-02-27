import { sendContactEmail } from "../utils/gmail.js";

export const contactSupport = async (req, res) => {
  try {
    const { fullName, email, phone, description } = req.body;
    const result = await sendContactEmail({
      fullName,
      email,
      phone,
      description,
    });
    if (result.success) {
      res.json({ success: true, message: "Support request sent successfully" });
    } else {
      res.json({
        success: false,
        message: "Failed to send support request",
        error: result.error,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
