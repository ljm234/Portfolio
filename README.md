# Jordan Montenegro-Calla - Portfolio

Personal portfolio site at jordanmontenegrocalla.com.

Built with Next.js 14 (App Router), React 18, TailwindCSS, Vercel, Resend for the contact form, Vitest, and Playwright.

Live deployments:
- Production: jordanmontenegrocalla.com
- GitHub Pages mirror: ljm234.github.io/Portfolio

The site runs on http://localhost:3000.

## Scripts

- `npm run dev` runs the development server.
- `npm run build` builds the production bundle.
- `npm run start` starts the production server.
- `npm run lint` runs ESLint.
- `npm test` runs the unit tests with Vitest.
- `npm run e2e` runs the end-to-end tests with Playwright.
- `npm run compress-images` walks the public folder and compresses any image larger than 500 KB.
- `npm run lhci` runs Lighthouse CI locally against the configured routes.

## Structure

- `src/app` contains the routes (App Router).
- `src/components` contains the reusable React components.
- `src/content` contains the static JSON content (publications, projects, data dictionary).
- `public` contains the static assets and the CV PDF at `public/downloads/Jordan-Montenegro-CV.pdf`.

## Author

Luis Jordan Montenegro Calla
ORCID: 0009-0000-7851-7139
Contact: jordanmontenegroc.99@gmail.com
GitHub: https://github.com/ljm234
HuggingFace: https://huggingface.co/luisjordanmontenegro
