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
  <title>Your Quotation from Sorcia Africa</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f7; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

          <!-- Logo -->
          <tr>
            <td style="background-color:#f0f4f8; padding: 30px 40px; text-align:center;">
              <img src="https://res.cloudinary.com/dpbb0exnp/image/upload/v1772459059/5848267812768517528_rogh7m.jpg" alt="Sorcia Africa" width="140" style="display:block; margin:0 auto;" />
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px 40px; text-align:center;">
              <p style="margin:0; color:#a0aec0; font-size:14px; letter-spacing:2px;">
                YOUR QUOTATION IS READY
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 36px 40px 20px;">
              <p style="margin:0; color:#2d3748; font-size:16px; line-height:1.6;">
                Hello <strong>${customerName}</strong>,
              </p>
              <p style="margin:12px 0 0; color:#4a5568; font-size:15px; line-height:1.6;">
                Thank you for your interest! We have prepared a detailed quotation for your request. Please review the price breakdown below.
              </p>
            </td>
          </tr>

          <!-- Product Details -->
          <tr>
            <td style="padding: 10px 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7fafc; border-radius:8px; padding:20px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px; color:#1a1a2e; font-size:16px; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #e2e8f0; padding-bottom:10px;">
                      Product Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:6px 0; color:#718096; font-size:14px;">Description</td>
                        <td style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">${description}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#718096; font-size:14px;">Quantity</td>
                        <td style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">${quantity}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; color:#718096; font-size:14px;">Colour</td>
                        <td style="padding:6px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">${colour}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Price Breakdown -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7fafc; border-radius:8px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px; color:#1a1a2e; font-size:16px; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #e2e8f0; padding-bottom:10px;">
                      Price Breakdown
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:8px 0; color:#718096; font-size:14px;">Product Cost</td>
                        <td style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${productCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#718096; font-size:14px;">Shipping Cost</td>
                        <td style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${shippingCost.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#718096; font-size:14px;">Service Fee</td>
                        <td style="padding:8px 0; color:#2d3748; font-size:14px; text-align:right; font-weight:600;">GHS ${serviceFee.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:8px 0 0;">
                          <hr style="border:none; border-top:1px solid #e2e8f0; margin:0;" />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0; color:#1a1a2e; font-size:18px; font-weight:700;">TOTAL</td>
                        <td style="padding:12px 0; color:#1a1a2e; font-size:18px; text-align:right; font-weight:700;">GHS ${total.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Approve Button -->
          <tr>
            <td style="padding: 10px 40px 30px; text-align:center;">
              <p style="margin:0 0 20px; color:#4a5568; font-size:15px; line-height:1.6;">
                If you are satisfied with this quotation, click the button below to approve and proceed with payment.
              </p>
              <a href="${approvalLink}" target="_blank" style="display:inline-block; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color:#ffffff; text-decoration:none; padding:16px 48px; border-radius:8px; font-size:16px; font-weight:600; letter-spacing:0.5px;">
                Approve Quotation
              </a>
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fffbeb; border-radius:8px; border-left:4px solid #f6ad55;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0; color:#744210; font-size:13px; line-height:1.5;">
                      <strong>Note:</strong> This quotation is valid for 7 days from the date of issue. Prices are subject to change after this period. For questions, reply to this email or contact our support team.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafc; padding: 24px 40px; text-align:center; border-top:1px solid #e2e8f0;">
              <p style="margin:0; color:#a0aec0; font-size:12px; line-height:1.5;">
                &copy; ${new Date().getFullYear()} Sorcia Africa. All rights reserved.
              </p>
              <p style="margin:6px 0 0; color:#a0aec0; font-size:12px;">
                This email was sent because you submitted a product request on our platform.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
