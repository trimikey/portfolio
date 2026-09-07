# Le Duc Tri - Portfolio

Personal portfolio website for Le Duc Tri, Fullstack Web Developer. Dark theme by default with a light-mode toggle, bilingual (EN / VI), built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # preview the production build
```

## Project structure

```
public/
  avatar.jpg            # profile picture shown in the hero (replace with your own photo)
  cv/Le-Duc-Tri-CV.pdf  # put your CV PDF here so the "Download CV" button works
  favicon.svg
src/
  data/content.ts       # ALL portfolio text, links and CV data (EN + VI)
  i18n/LanguageContext.tsx
  components/           # Navbar, Hero, About, Experience, Projects, Skills, Certifications, Contact, Footer
  components/ui/        # Section, Reveal (scroll animation), Tag
  index.css             # theme tokens (colors, fonts) and small utility classes
```

## Editing content

Everything shown on the page lives in `src/data/content.ts`:

- `profile` holds contact info, GitHub, LinkedIn, CV path and avatar path.
- `en` and `vi` hold the translated copy for every section.

To change colors, edit the `:root` (dark) and `:root[data-theme="light"]` (light) palettes at the top of `src/index.css`. The theme choice is stored in `localStorage` under `theme`; dark is the default.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) (free, no account) and the message lands in the inbox configured in `profile.formEndpoint` in `src/data/content.ts`.

- The very first submission triggers an **activation email** to that inbox. Click "Activate" once; until then messages are held.
- After activation, FormSubmit emails you a random alias (for example `https://formsubmit.co/ajax/abc123def456`). Paste it into `profile.formEndpoint` if you prefer not to expose the raw address in the page source.
- Spam protection: a hidden honeypot field plus FormSubmit's own filtering. Replies go to the sender's address via `_replyto`.

## Deploying

The build output in `dist/` is a static site. It can be hosted on Vercel, Netlify, GitHub Pages or any static host.
