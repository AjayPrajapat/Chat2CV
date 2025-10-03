import { CVProfile } from '@types/cv';

export const modernAccent = (profile: CVProfile) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Poppins', sans-serif; margin: 0; color: #111827; }
    .hero { background: linear-gradient(135deg, #1A73E8, #6C63FF); color: white; padding: 48px; }
    .hero h1 { margin: 0; font-size: 32px; }
    .section { padding: 32px 48px; }
    .card { background: #FFFFFF; padding: 16px; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(26,115,232,0.1); }
    @media (prefers-color-scheme: dark) {
      body { background: #0B1120; color: #F9FAFB; }
      .card { background: #111827; box-shadow: none; border: 1px solid #1F2937; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>${profile.basic.fullName}</h1>
    <p>${profile.basic.title}</p>
    <p>${profile.basic.summary}</p>
  </section>
  <section class="section">
    <h2>Experience</h2>
    ${(profile.work ?? [])
      .map(
        (item) => `
      <div class="card">
        <strong>${item.role}</strong> @ ${item.company}
        <p>${item.achievements.join('<br/>')}</p>
      </div>`
      )
      .join('')}
  </section>
</body>
</html>
`;
