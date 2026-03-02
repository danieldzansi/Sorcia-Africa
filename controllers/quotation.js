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

    const baseUrl = process.env.FRONTEND_URL || "https://sorciaafrica.com";
    const approvalLink = `${baseUrl}/quote/approve/${approvalToken}`;

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

export const approveQuotation = async (req, res) => {
  try {
    const { token } = req.params;

    const [quotation] = await db
      .select()
      .from(quotations)
      .where(eq(quotations.approvalToken, token));

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired approval link.",
      });
    }

    if (quotation.status === "approved") {
      return res.json({
        success: true,
        message: "This quotation has already been approved.",
        quotation,
      });
    }

    const [updated] = await db
      .update(quotations)
      .set({ status: "approved" })
      .where(eq(quotations.approvalToken, token))
      .returning();

    res.json({
      success: true,
      message: "Quotation approved successfully.",
      quotation: updated,
    });
  } catch (error) {
    console.error("approveQuotation error:", error);
    res.status(500).json({ success: false, message: error.message });
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
