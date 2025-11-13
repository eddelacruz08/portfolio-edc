# Portfolio - Edmon Dela Cruz

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components. Features smooth animations, dark mode, internationalization support, and a fully functional contact form with email integration.

## 🚀 Features

- **Modern Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Component Library**: shadcn/ui with Radix UI primitives
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion with prefers-reduced-motion support
- **Email**: Resend integration for contact form
- **Analytics**: Vercel Analytics built-in
- **Internationalization**: next-intl with English and Filipino support
- **Dark Mode**: System-aware theme toggle with persistence
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Performance**: Image optimization, code splitting, lazy loading
- **SEO**: Metadata, Open Graph tags, semantic HTML

## 📋 Prerequisites

- Node.js 18+ and npm
- A Resend API key (get one at [resend.com](https://resend.com))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd portfolio-edc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and update with your credentials:
   ```bash
   cp .env.local .env.local.example
   ```

   Update the following variables:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   EMAIL_FROM=your-verified-sender@yourdomain.com
   EMAIL_TO=your-email@example.com
   ```

   **Important**: 
   - Get your Resend API key from https://resend.com/api-keys
   - `EMAIL_FROM` must be a verified domain in Resend (use `onboarding@resend.dev` for testing)
   - `EMAIL_TO` is where contact form submissions will be sent

4. **Add your content**
   
   Update the mock data in `/mocks/index.ts`:
   - Profile information
   - Projects list
   - Blog posts
   - Timeline (work experience & education)
   - Skills

5. **Add images**
   
   Replace placeholder files in `/public/images/`:
   - `avatar.jpg` - Your profile photo (400x400px recommended)
   - `projects/*.png` - Project screenshots
   - `blog/*.png` - Blog cover images
   - `resume.pdf` - Your actual resume

## 🎨 Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📂 Project Structure

```
portfolio-edc/
├── app/                      # Next.js app router pages
│   ├── (routes)/
│   │   ├── page.tsx         # Home page
│   │   ├── projects/        # Projects pages
│   │   ├── about/           # About page
│   │   ├── blog/            # Blog pages
│   │   └── contact/         # Contact page
│   ├── api/                 # API route handlers
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── blog/
│   │   └── contact/
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── timeline.tsx
│   ├── skills.tsx
│   └── project-carousel.tsx
├── hooks/                   # Custom React hooks
│   ├── use-api.ts          # TanStack Query hooks
│   └── use-prefers-reduced-motion.ts
├── lib/                     # Utility libraries
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Utility functions
│   ├── analytics.ts        # Vercel Analytics wrapper
│   ├── resend.ts           # Resend client
│   ├── rate-limit.ts       # Rate limiting
│   ├── query-client.ts     # TanStack Query setup
│   └── i18n.ts             # Internationalization config
├── messages/                # i18n translations
│   ├── en.json             # English
│   └── fil.json            # Filipino
├── mocks/                   # Mock data
│   └── index.ts
├── providers/               # React context providers
│   ├── query-provider.tsx
│   └── theme-provider.tsx
└── public/                  # Static assets
    ├── images/
    └── resume.pdf
```

## 🎨 Customization

### Brand Colors

Update Tailwind theme colors in `app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);    /* Primary brand color */
  --background: oklch(1 0 0);      /* Background */
  --foreground: oklch(0.145 0 0);  /* Text color */
  /* ... more variables ... */
}
```

### Fonts

Update fonts in `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

### Content

1. **Profile**: Edit `mocks/index.ts` → `mockProfile`
2. **Projects**: Edit `mocks/index.ts` → `mockProjects` and `mockProjectDetails`
3. **Blog**: Edit `mocks/index.ts` → `mockBlogPosts`
4. **Timeline**: Edit `mocks/index.ts` → `mockTimeline`
5. **Skills**: Edit `mocks/index.ts` → `mockSkills`

## 📧 Contact Form Setup

The contact form uses Resend for email delivery:

1. **Sign up for Resend**: https://resend.com
2. **Add domain** (optional): For production, add and verify your domain
3. **Get API key**: Create an API key in your dashboard
4. **Update .env.local**: Add your API key and email addresses

### Testing Contact Form

For development, use the test sender:
```env
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-test-email@example.com
```

### Rate Limiting

The contact form includes built-in rate limiting:
- 3 requests per hour per IP address
- Honeypot field for bot prevention
- Server-side validation with Zod

## 🌍 Internationalization

The site supports multiple languages using next-intl:

### Adding a New Language

1. Create translation file: `messages/[locale].json`
2. Add locale to `lib/i18n.ts`:
   ```typescript
   export const locales = ['en', 'fil', 'your-locale'] as const;
   ```
3. Translate all keys following the structure in `messages/en.json`

### Using Translations

```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('nav');
  return <span>{t('home')}</span>;
}
```

## 📊 Analytics

Vercel Analytics is pre-configured. Custom events are tracked via `lib/analytics.ts`:

- Resume downloads
- Project views
- Project link clicks (repo/live)
- Contact form submissions
- Navigation events

### Custom Event Tracking

```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('custom_event_name', { property: 'value' });
```

## ♿ Accessibility

The portfolio follows WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation
- ✅ Screen reader support with ARIA labels
- ✅ Color contrast >= 4.5:1
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Reduced motion support

### Testing Accessibility

```bash
# Install axe DevTools browser extension
# Or use Lighthouse in Chrome DevTools
# Target: Accessibility score >= 90
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Add environment variables:
     - `RESEND_API_KEY`
     - `EMAIL_FROM`
     - `EMAIL_TO`
   - Deploy!

3. **Set up custom domain** (optional)
   - Go to Project Settings → Domains
   - Add your domain and follow DNS instructions

### Deploy to Other Platforms

The project can also deploy to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted with Node.js

Build command: `npm run build`  
Output directory: `.next`

## 🔒 Security

- CSP headers configured in `next.config.ts`
- Rate limiting on contact endpoint
- Input validation with Zod
- Honeypot field for bot prevention
- XSS protection via React escaping

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For questions or support:
- Open an issue on GitHub
- Email: hello@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)
- [TanStack Query](https://tanstack.com/query)
- [Framer Motion](https://framer.com/motion)
- [Resend](https://resend.com)
- [Vercel](https://vercel.com)

---

Built with ❤️ by Edmon Dela Cruz
