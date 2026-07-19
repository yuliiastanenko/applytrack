import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type DigestJob = {
  title: string
  company: string
  url: string
}

export async function sendDigestEmail(
  to: string,
  label: string,
  jobs: DigestJob[]
) {
  const jobsHtml =
    jobs.length > 0
      ? jobs
          .map(
            (j) => `<li><a href="${j.url}">${j.title}</a> — ${j.company}</li>`
          )
          .join("")
      : "<p>No new matches this time.</p>"

  await resend.emails.send({
    from: "ApplyTrack <onboarding@resend.dev>",
    to,
    subject: `${label}: ${jobs.length} new matches`,
    html: `<h2>${label}</h2><ul>${jobsHtml}</ul>`,
  })
}
