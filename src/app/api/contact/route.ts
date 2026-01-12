// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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

    // Send email using the utility function
    await sendEmail({ name, email, subject, message });

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
    to_email: "contact@sulakshyanaghimire.com.np",
  }),
});
const data = await response.json();

Option 2: Resend (Recommended - Modern, Free tier)
npm install resend

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'portfolio@yourdomain.com',
  to: 'contact@sulakshyanaghimire.com.np',
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
  to: 'contact@sulakshyanaghimire.com.np',
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
  to: 'contact@sulakshyanaghimire.com.np',
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
