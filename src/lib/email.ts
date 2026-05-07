// src/lib/email.ts
import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmail(data: EmailData): Promise<void> {
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message),
  };
  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error("Email credentials not configured");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify connection
  await transporter.verify();

  // Send email with beautiful HTML template
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${safe.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(90deg, #667eea, #764ba2);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
          }
          .info-box {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #667eea;
          }
          .info-row {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            color: #667eea;
          }
          .message-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            color: #6b7280;
            font-size: 14px;
          }
          .reply-button {
            display: inline-block;
            background: linear-gradient(90deg, #667eea, #764ba2);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="info-box">
              <div class="info-row">
                <span class="label">From:</span> ${safe.name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${safe.email}">${safe.email}</a>
              </div>
              <div class="info-row">
                <span class="label">Subject:</span> ${safe.subject}
              </div>
            </div>

            <h3 style="color: #667eea; margin-top: 30px;">Message:</h3>
            <div class="message-box">
              ${safe.message}
            </div>

            <div style="text-align: center;">
              <a href="mailto:${safe.email}" class="reply-button">
                Reply to ${safe.name}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio website contact form</p>
            <p style="margin-top: 10px; color: #9ca3af;">
              Received on ${new Date().toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    replyTo: data.email,
  });
}
