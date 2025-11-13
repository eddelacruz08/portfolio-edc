import { Resend } from 'resend';

// Initialize Resend client with API key from environment
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  to: process.env.EMAIL_TO || 'hello@example.com',
};
