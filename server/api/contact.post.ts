// server/api/contact.post.ts

import { sendEmail } from '#server/utils/sendEmail'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Anti-bot logic
  const currentTime = Date.now()
  const pageLoadTime = parseInt(body.p_t || '0')

  if (body.full_name_confirm || currentTime - pageLoadTime < 3000) {
    console.warn('Bot submission blocked.')
    return sendRedirect(event, '/thank-you', 302)
  }

  try {
    // Attempt to send the email using our utility
    await sendEmail({
      to: process.env.CONTACT_EMAIL || '',
      subject: `New GCSE Maths Inquiry: ${body.name}`,
      replyTo: body.email,
      text: `Inquiry from ${body.name}`,
      html: `
        <h3>New Lead Received</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    })

    console.log(`Email successfully sent to: ${process.env.CONTACT_EMAIL}`)

    // Success: Redirect to the Thank You page
    return sendRedirect(event, '/thank-you', 302)
  } catch (e) {
    // Log the actual error for debugging on your MacBook
    console.error('Send email failed:', e)

    // Failure: Redirect back to the form with an error flag
    // The user will see the error message we set up in the frontend
    const queryParams = new URLSearchParams({
      name: body.name || '',
      email: body.email || '',
      error: 'send_failed',
    })
    return sendRedirect(
      event,
      `/landing-v01?${queryParams.toString()}#contact-form`,
      302
    )
  }
})
