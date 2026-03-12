// Email helper using Resend (or Nodemailer as fallback)
// Install: npm install resend

interface BookingEmailData {
  clientName: string
  clientEmail: string
  serviceName: string
  bookingId: string
  amount?: number
}

interface ContactEmailData {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  // Using Resend API
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping email')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'noreply@karunportfolio.com',
      to: [data.clientEmail],
      subject: `Booking Confirmed - ${data.serviceName}`,
      html: `
        <h2>Hi ${data.clientName},</h2>
        <p>Your booking for <strong>${data.serviceName}</strong> has been received.</p>
        <p>Booking ID: <code>${data.bookingId}</code></p>
        ${data.amount ? `<p>Amount: $${data.amount}</p>` : ''}
        <p>We'll be in touch soon to confirm details.</p>
        <p>Best,<br/>Karun</p>
      `,
    }),
  })

  return response.json()
}

export async function sendAdminBookingAlert(data: BookingEmailData) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'noreply@karunportfolio.com',
      to: [process.env.ADMIN_EMAIL],
      subject: `New Booking: ${data.serviceName} from ${data.clientName}`,
      html: `
        <h2>New Booking Received</h2>
        <p>Client: ${data.clientName} (${data.clientEmail})</p>
        <p>Service: ${data.serviceName}</p>
        <p>Booking ID: ${data.bookingId}</p>
        ${data.amount ? `<p>Amount: $${data.amount}</p>` : ''}
      `,
    }),
  })
}

export async function sendContactNotification(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'noreply@karunportfolio.com',
      to: [process.env.ADMIN_EMAIL],
      subject: `Contact Form: ${data.subject || 'New Message'} from ${data.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p>From: ${data.name} (${data.email})</p>
        <p>Subject: ${data.subject || 'N/A'}</p>
        <p>Message:</p>
        <blockquote>${data.message}</blockquote>
      `,
    }),
  })
}
