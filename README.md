# ApplyTrack

I built this because job hunting last year meant a dozen browser tabs, three spreadsheets, and me still forgetting who I'd already applied to. So I made this instead: it searches job boards for me, tracks every application through to an offer, and emails me when something new shows up that matches what I'm looking for.

### Try it

- **Live**: https://applytrack-sooty.vercel.app
- **Demo login**: `demo@applytrack.dev` / `demo1234`

### What it does

You track your applications on a Kanban board - drag a card from "Applied" to "Interview" and it's saved. Every application has its own timeline, so I can see when I applied, when the recruiter called, when things went quiet.

The part I actually wanted from day one: set a search (say, "junior react remote"), and the app checks Remotive and Arbeitnow for you, keeps what's new, and skips anything you've already seen. Once a day it can email you a summary - or tell you honestly that nothing new turned up, which happens more often than I expected.

There's a small dashboard too, mostly so I stop lying to myself about how many places I've actually applied to this week.

### Built with

Next.js and TypeScript for the app itself, Postgres (via Neon) and Prisma for the data, Tailwind for styling, Zod for validating anything a user sends in, Resend for the emails, Recharts for the one chart I needed, and dnd-kit for the board. Tests run with Vitest, and GitHub Actions runs them on every push so I stop finding out things are broken the hard way.

### A couple of decisions worth explaining

Each job source (Remotive, Arbeitnow) is just a small adapter behind one shared interface. Adding a third source later means writing one new file, not touching anything else - which was the whole point of designing it that way.

Duplicate listings are handled at the database level: a unique constraint on `(user, source, external id)` means the same listing can show up in a search a hundred times and it still only gets saved once.

### What's actually done

- Full authentication flow - sign up, log in, bcrypt-hashed passwords, cookie-based sessions, protected routes
- Application tracker - create, filter, search, update status, delete, with a full event timeline per application
- Kanban board with drag-and-drop status updates
- Job search across two live sources (Remotive, Arbeitnow) with tag-based filtering and deduplication
- Saved search criteria with scheduled email digests via Resend, running on Vercel Cron
- Dashboard with response rate, interview count, overdue follow-ups, and a daily applications chart
- Input validation on every write endpoint via Zod, with error messages surfaced in the UI
- TypeScript strict mode enabled across the entire codebase
- Unit tests (Vitest) covering validation schemas and deduplication logic
- CI pipeline (GitHub Actions) running lint and tests on every push
- Deployed on Vercel with a scheduled cron job for the email digest

### Running it locally

```bash
git clone https://github.com/yuliiastanenko/applytrack.git
cd applytrack
npm install
# add a .env with DATABASE_URL, RESEND_API_KEY, and CRON_SECRET
npx prisma migrate dev
npm run seed
npm run dev
```

### Tests

```bash
npm run test
```
