import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST || "mail.prefabpanelnepal.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "false" ? false : port === 465;
  const user = process.env.SMTP_USER || "contact@prefabpanelnepal.com";
  const pass = process.env.SMTP_PASS || "";

  if (!pass) {
    console.warn("SMTP_PASS is not configured. Email notification skipped.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents issues with self-signed or shared cPanel certs
    },
  });
}

export async function sendContactNotification({ name, email, phone, message }) {
  try {
    const transporter = getTransporter();
    if (!transporter) return false;

    const fromAddress = `"Smart Panel Website" <${process.env.SMTP_USER || "contact@prefabpanelnepal.com"}>`;
    const toAddress = process.env.SMTP_TO || "contact@prefabpanelnepal.com, info@prefabpanelnepal.com";

    const mailOptions = {
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New Contact Inquiry from ${name} - Smart Panel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1b5d92; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Contact Message</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Smart Panel Website Inquiry</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            Sent automatically from prefabpanelnepal.com contact form.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send contact email notification:", error);
    return false;
  }
}

export async function sendDealershipNotification({ name, email, phone, location, message }) {
  try {
    const transporter = getTransporter();
    if (!transporter) return false;

    const fromAddress = `"Smart Panel Website" <${process.env.SMTP_USER || "contact@prefabpanelnepal.com"}>`;
    const toAddress = process.env.SMTP_TO || "contact@prefabpanelnepal.com, info@prefabpanelnepal.com";

    const mailOptions = {
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `🚨 New Dealership Application from ${name} (${location})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2b8a3e; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Dealership Inquiry</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Smart Panel Partner Application</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 130px;"><strong>Applicant Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Phone Number:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><strong>${phone}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Target District/City:</strong></td>
                <td style="padding: 8px 0; color: #2b8a3e; font-size: 14px; font-weight: bold;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Details / Message:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${message || "No additional message provided."}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            Sent automatically from prefabpanelnepal.com dealership application form.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send dealership email notification:", error);
    return false;
  }
}
