/**
 * Generate HTML email template for a quotation sent to a customer.
 *
 * @param {Object} params
 * @param {string} params.customerName
 * @param {string} params.description
 * @param {number} params.quantity
 * @param {string} params.colour
 * @param {number} params.productCost
 * @param {number} params.shippingCost
 * @param {number} params.serviceFee
 * @param {number} params.total
 * @param {string} params.approvalLink
 * @returns {string} HTML string
 */
export const quotationEmailTemplate = ({
  customerName,
  description,
  quantity,
  colour,
  productCost,
  shippingCost,
  serviceFee,
  total,
  approvalLink,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your Quotation from Sorcia Africa</title>
  <style>
    /* Reset */
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }

    /* Mobile styles */
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .logo-img { width: 100% !important; max-width: 100% !important; }
      .heading-text { font-size: 22px !important; }
      .body-text { font-size: 14px !important; }
      .detail-label { font-size: 13px !important; }
      .detail-value { font-size: 13px !important; }
      .total-label { font-size: 16px !important; }
      .total-value { font-size: 16px !important; }
      .cta-button { padding: 14px 32px !important; font-size: 15px !important; }
      .note-text { font-size: 12px !important; }
      .footer-text { font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f7; padding: 24px 0;">
    <tr>
      <td align="center" style="padding: 0 12px;">
        <!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" align="center"><tr><td><![endif]-->
        <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

          <!-- Logo Section -->
          <tr>
            <td style="background-color:#f0f4f8; padding: 0; text-align:center;">
              <img src="https://res.cloudinary.com/dpbb0exnp/image/upload/v1772459059/5848267812768517528_rogh7m.jpg" alt="Sorcia Africa" class="logo-img" width="600" style="display:block; width:100%; max-width:600px; height:auto;" />
            </td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td style="background-color:#1a1a2e; padding: 24px 20px; text-align:center;">
              <p style="margin:0; color:#a0aec0; font-size:14px; letter-spacing:2px; text-transform:uppercase;">
                Your Quotation Is Ready
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td class="fluid-padding" style="padding: 32px 40px 16px;">
              <p class="body-text" style="margin:0; color:#2d3748; font-size:16px; line-height:1.6;">
                Hello <strong>${customerName}</strong>,
              </p>
              <p class="body-text" style="margin:12px 0 0; color:#4a5568; font-size:15px; line-height:1.6;">
                Thank you for your interest! We have prepared a detailed quotation for your request. Please review the price breakdown below.
              </p>
            </td>
          </tr>

          <!-- Product Details -->
          <tr>
            <td class="fluid-padding" style="padding: 10px 40px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7fafc; border-radius:8px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 14px; color:#1a1a2e; font-size:15px; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #e2e8f0; padding-bottom:10px;">
                      Product Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="detail-label" style="padding:6px 0; color:#718096; font-size:14px; width:40%;">Description</td>
                        <td class="detail-value" style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600; word-break:break-word;">${description}</td>
                      </tr>
                      <tr>
                        <td class="detail-label" style="padding:6px 0; color:#718096; font-size:14px;">Quantity</td>
                        <td class="detail-value" style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">${quantity}</td>
                      </tr>
                      <tr>
                        <td class="detail-label" style="padding:6px 0; color:#718096; font-size:14px;">Colour</td>
                        <td class="detail-value" style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">${colour}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Price Breakdown -->
          <tr>
            <td class="fluid-padding" style="padding: 0 40px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7fafc; border-radius:8px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 14px; color:#1a1a2e; font-size:15px; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #e2e8f0; padding-bottom:10px;">
                      Price Breakdown
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="detail-label" style="padding:8px 0; color:#718096; font-size:14px;">Product Cost</td>
                        <td class="detail-value" style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${productCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td class="detail-label" style="padding:8px 0; color:#718096; font-size:14px;">Shipping Cost</td>
                        <td class="detail-value" style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${shippingCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td class="detail-label" style="padding:8px 0; color:#718096; font-size:14px;">Service Fee</td>
                        <td class="detail-value" style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${serviceFee.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:8px 0 0;">
                          <hr style="border:none; border-top:1px solid #e2e8f0; margin:0;" />
                        </td>
                      </tr>
                      <tr>
                        <td class="total-label" style="padding:12px 0; color:#1a1a2e; font-size:18px; font-weight:700;">TOTAL</td>
                        <td class="total-value" style="padding:12px 0; color:#1a1a2e; font-size:18px; text-align:right; font-weight:700;">GHS ${total.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Approve Button -->
          <tr>
            <td class="fluid-padding" style="padding: 10px 40px 28px; text-align:center;">
              <p class="body-text" style="margin:0 0 20px; color:#4a5568; font-size:15px; line-height:1.6;">
                If you are satisfied with this quotation, click the button below to approve and proceed with payment.
              </p>
              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${approvalLink}" style="height:50px;v-text-anchor:middle;width:250px;" arcsize="16%" fillcolor="#1a1a2e"><center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">Approve Quotation</center></v:roundrect><![endif]-->
              <!--[if !mso]><!--><a href="${approvalLink}" target="_blank" class="cta-button" style="display:inline-block; background-color:#1a1a2e; color:#ffffff; text-decoration:none; padding:16px 48px; border-radius:8px; font-size:16px; font-weight:600; letter-spacing:0.5px; mso-hide:all;">
                Approve Quotation
              </a><!--<![endif]-->
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td class="fluid-padding" style="padding: 0 40px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7fafc; border-radius:8px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p class="note-text" style="margin:0; color:#4a5568; font-size:13px; line-height:1.5;">
                      <strong>Note:</strong> This quotation is valid for 7 days from the date of issue. Prices are subject to change after this period. For questions, reply to this email or contact our support team.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc; padding: 20px 24px; text-align:center; border-top:1px solid #e2e8f0;">
              <p class="footer-text" style="margin:0; color:#a0aec0; font-size:12px; line-height:1.5;">
                &copy; ${new Date().getFullYear()} Sorcia Africa. All rights reserved.
              </p>
              <p class="footer-text" style="margin:6px 0 0; color:#a0aec0; font-size:12px;">
                This email was sent because you submitted a product request on our platform.
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
