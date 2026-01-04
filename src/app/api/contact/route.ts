// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email credentials not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Send email with styled HTML
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `Portfolio Contact: ${subject}`,
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
              <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <div class="info-row">
                  <span class="label">From:</span> ${name}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Subject:</span> ${subject}
                </div>
              </div>
              
              <h3 style="color: #667eea; margin-top: 30px;">Message:</h3>
              <div class="message-box">
                ${message}
              </div>

              <div style="text-align: center;">
                <a href="mailto:${email}" class="reply-button">
                  Reply to ${name}
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
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send message. Please try again.";

    if (error.code === "EAUTH") {
      errorMessage =
        "Email authentication failed. Please contact the administrator.";
    } else if (error.code === "ESOCKET") {
      errorMessage = "Network error. Please check your connection.";
    } else if (error.message) {
      console.error("Detailed error:", error.message);
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/* 
ALTERNATIVE EMAIL OPTIONS (Choose one)

Option 1: Send email using Web3Forms (Free, No signup needed initially)
const response = await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    access_key: process.env.WEB3FORMS_ACCESS_KEY, // Get free key from web3forms.com
    name,
    email,
    subject,
    message,
    from_name: `Portfolio Contact: ${name}`,
    to_email: "swastikaghimire100@gmail.com",
  }),
});
const data = await response.json();

Option 2: Resend (Recommended - Modern, Free tier)
npm install resend

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'portfolio@yourdomain.com',
  to: 'swastikaghimire100@gmail.com',
  subject: subject,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `
});

Option 3: SendGrid (Enterprise grade, Free tier)
npm install @sendgrid/mail

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'swastikaghimire100@gmail.com',
  from: 'your-verified-email@domain.com',
  subject: subject,
  text: message,
  html: `<strong>${message}</strong>`,
});

Option 4: Nodemailer (Most flexible, uses Gmail SMTP)
npm install nodemailer

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'swastikaghimire100@gmail.com',
  subject: `Portfolio Contact: ${subject}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  replyTo: email,
});

Option 5: EmailJS (Client-side, No backend needed)
Just use their React SDK directly in the component

Option 6: Formspree (Simplest, just HTML form)
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
*/
