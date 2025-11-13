# Quick Setup Guide

## 🎯 Getting Started in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file with:

```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-email@example.com
```

**Get a Resend API Key:**
1. Go to https://resend.com
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy it to your `.env.local`

### 3. Customize Your Content

Edit `/mocks/index.ts` to update:
- ✏️ Your name, title, and bio (`mockProfile`)
- 💼 Your projects (`mockProjects` and `mockProjectDetails`)
- 📝 Your blog posts (`mockBlogPosts`)
- 🎓 Your work experience and education (`mockTimeline`)
- 🛠️ Your skills (`mockSkills`)

### 4. Add Your Images

Replace placeholder files in `/public/images/`:
- `avatar.jpg` - Your profile photo (400x400px)
- `projects/*.png` - Project screenshots
- `resume.pdf` - Your actual resume

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your portfolio!

## 📦 Ready to Deploy?

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel: https://vercel.com/new
3. Add environment variables in Vercel dashboard
4. Click Deploy!

Your portfolio will be live at `https://your-project.vercel.app`

## 🎨 Customization Tips

### Change Colors

Edit `app/globals.css` and modify the CSS variables:

```css
:root {
  --primary: oklch(0.205 0 0);  /* Change this! */
}
```

### Update Social Links

Edit the `social` array in `mockProfile`:

```typescript
social: [
  { network: 'github', url: 'https://github.com/yourhandle' },
  { network: 'linkedin', url: 'https://linkedin.com/in/yourhandle' },
]
```

### Add More Pages

Create new pages in `/app/your-page/page.tsx` following the existing structure.

## 🐛 Troubleshooting

**Contact form not working?**
- Verify Resend API key is correct
- Check `EMAIL_FROM` is a verified domain (or use `onboarding@resend.dev` for testing)

**Build errors?**
```bash
npm run lint  # Check for linting issues
npm run build # Verify production build
```

**Images not showing?**
- Make sure image files exist (not just `.placeholder` files)
- Check file names match exactly what's in `mocks/index.ts`

## 📚 Learn More

- Full documentation: [README.md](./README.md)
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Next.js docs: https://nextjs.org/docs

## 🆘 Need Help?

- Check the [README](./README.md) for detailed documentation
- Open an issue on GitHub
- Contact: hello@example.com

Happy coding! 🚀

