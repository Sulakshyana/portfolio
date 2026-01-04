import nodemailer from "nodemailer";

export async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "swastikaghimire100@gmail.com",
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      
        New Contact Form Submission
        
          Name: ${data.name}
          Email: ${data.email}
          Subject: ${data.subject}
        
        
          Message:
          ${data.message}
        
      
    `,
    replyTo: data.email,
  });
}
