# Swastika Ghimire — Developer Portfolio

Personal portfolio of **Swastika Ghimire**, Full Stack Developer from Patan, Nepal.
Built with Next.js 16, showcasing projects, experience, skills, and a blog.

**Live →** [sulakshyanaghimire.com.np](https://sulakshyanaghimire.com.np)

---

## Tech Stack

- **Framework** — Next.js 16 App Router, React 19, TypeScript
- **Styling** — Tailwind CSS v4, Framer Motion, dark mode
- **Backend** — MongoDB (Mongoose), Nodemailer
- **SEO** — JSON-LD structured data, sitemap, Open Graph, PWA manifest
- **Analytics** — Google Analytics 4

---

## Features

- **Portfolio sections** — Hero, About, Experience, Projects, Skills, Education, Contact
- **Blog** — MongoDB-powered posts with pagination, category filter, markdown rendering, view counter, syntax-highlighted code blocks
- **Admin dashboard** — password-protected at `/admin`; create, edit, and delete posts with a live markdown preview editor
- **Contact form** — sends email via Nodemailer with HTML injection protection

---

## Local Setup

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

See [`.env.example`](.env.example) for required environment variables.

The admin dashboard is available at `/admin` — set `ADMIN_SECRET` in your `.env.local` and use it as the password.

---

## Connect

- **Email** — [contact@sulakshyanaghimire.com.np](mailto:contact@sulakshyanaghimire.com.np)
- **GitHub** — [github.com/sulakshyana](https://github.com/sulakshyana)
- **LinkedIn** — [linkedin.com/in/sulakshyana-ghimire](https://www.linkedin.com/in/sulakshyana-ghimire/)

---

## License

[MIT](LICENSE)
