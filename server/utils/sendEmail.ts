// utils/sendEmail.ts
import nodemailer from 'nodemailer'

interface EmailPayload {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string // Optional, useful if you want to reply directly to the parent
}

export async function sendEmail(payload: EmailPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Lead Capture" <${process.env.SMTP_USER}>`,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    replyTo: payload.replyTo,
  }

  return transporter.sendMail(mailOptions)
}
