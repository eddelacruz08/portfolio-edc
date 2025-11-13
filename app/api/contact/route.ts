import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { rateLimit } from '@/lib/rate-limit';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limiting
    const rateLimitResult = rateLimit(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check (bot prevention)
    if (body.honeypot) {
      return NextResponse.json(
        { ok: true, message: 'Message received' },
        { status: 200 }
      );
    }

    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error: firstError?.message || 'Validation error',
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    // Send email via Resend
    try {
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.to,
        replyTo: email,
        subject: `Portfolio Contact: Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      return NextResponse.json({
        ok: true,
        message:
          'Thanks for reaching out! I will get back to you within 2 business days.',
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to send message. Please try again later.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}
