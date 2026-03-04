import crypto from "crypto";
import { eq } from "drizzle-orm";
import db, { productRequest, quotations } from "../db/index.js";
import { sendQuotationEmail } from "../utils/resendEmail.js";
import { quotationEmailTemplate } from "../utils/emailTemplates.js";
import "dotenv/config";

export const sendQuotation = async (req, res) => {
  try {
    const { requestId, productCost, shippingCost, serviceFee } = req.body;
    if (
      !requestId ||
      productCost == null ||
      shippingCost == null ||
      serviceFee == null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "requestId, productCost, shippingCost and serviceFee are required.",
      });
    }
    const [request] = await db
      .select()
      .from(productRequest)
      .where(eq(productRequest.id, requestId));

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Product request not found.",
      });
    }
    const total =
      parseInt(productCost) + parseInt(shippingCost) + parseInt(serviceFee);

    const approvalToken = crypto.randomUUID();

    const [quotation] = await db
      .insert(quotations)
      .values({
        requestId,
        productCost: parseInt(productCost),
        shippingCost: parseInt(shippingCost),
        serviceFee: parseInt(serviceFee),
        total,
        approvalToken,
        status: "sent",
      })
      .returning();

    const apiUrl = process.env.API_URL || "https://sorciaafrica.com/api";
    const approvalLink = `${apiUrl}/quotations/approve/${approvalToken}`;

    const emailHtml = quotationEmailTemplate({
      customerName: request.fullName,
      description: request.description,
      quantity: request.quantity,
      colour: request.colour,
      productCost: parseInt(productCost),
      shippingCost: parseInt(shippingCost),
      serviceFee: parseInt(serviceFee),
      total,
      approvalLink,
    });

    const emailResult = await sendQuotationEmail({
      to: request.email,
      subject: `Your Quotation from Sorcia Africa – GHS ${total.toLocaleString()}`,
      html: emailHtml,
    });

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Quotation saved but email failed to send.",
        quotation,
        emailError: emailResult.error,
      });
    }

    res.json({
      success: true,
      message: "Quotation sent successfully.",
      quotation,
    });
  } catch (error) {
    console.error("sendQuotation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const approvalPageHtml = (title, message, success) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Sorcia Africa</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; }
    .card { background: #fff; border-radius: 12px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .icon { font-size: 56px; margin-bottom: 16px; }
    h1 { font-size: 24px; color: #1a1a1a; margin-bottom: 12px; }
    p { font-size: 16px; color: #555; line-height: 1.6; }
    .success { color: #16a34a; }
    .error { color: #dc2626; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${success ? "✅" : "❌"}</div>
    <h1 class="${success ? "success" : "error"}">${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>
`;

export const approveQuotation = async (req, res) => {
  try {
    const { token } = req.params;

    const [quotation] = await db
      .select()
      .from(quotations)
      .where(eq(quotations.approvalToken, token));

    if (!quotation) {
      return res
        .status(404)
        .send(
          approvalPageHtml(
            "Link Not Found",
            "This approval link is invalid or has expired. Please contact Sorcia Africa for assistance.",
            false,
          ),
        );
    }

    if (quotation.status === "approved") {
      return res.send(
        approvalPageHtml(
          "Already Approved",
          "This quotation has already been approved. Thank you!",
          true,
        ),
      );
    }

    await db
      .update(quotations)
      .set({ status: "approved" })
      .where(eq(quotations.approvalToken, token))
      .returning();

    res.send(
      approvalPageHtml(
        "Quotation Approved!",
        "Your quotation has been approved successfully. The Sorcia Africa team will be in touch with you shortly. Thank you!",
        true,
      ),
    );
  } catch (error) {
    console.error("approveQuotation error:", error);
    res
      .status(500)
      .send(
        approvalPageHtml(
          "Something Went Wrong",
          "An error occurred while processing your approval. Please try again later or contact support.",
          false,
        ),
      );
  }
};

export const listQuotations = async (req, res) => {
  try {
    const allQuotations = await db.select().from(quotations);
    res.json({ success: true, quotations: allQuotations });
  } catch (error) {
    console.error("listQuotations error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
