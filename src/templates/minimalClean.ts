import { CVProfile } from '@types/cv';

export const minimalClean = (profile: CVProfile) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', sans-serif; margin: 40px; color: #111827; }
    header { text-align: center; margin-bottom: 24px; }
    h1 { letter-spacing: 2px; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .tag { background: #F3F4F6; padding: 4px 8px; border-radius: 12px; margin: 2px; display: inline-block; }
    @media (prefers-color-scheme: dark) {
      body { background: #0B1120; color: #F9FAFB; }
      .tag { background: #1F2937; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${profile.basic.fullName}</h1>
    <p>${profile.basic.title}</p>
  </header>
  <section>
    <h2>Summary</h2>
    <p>${profile.basic.summary}</p>
  </section>
  <section class="grid">
    <div>
      <h3>Experience</h3>
      ${(profile.work ?? [])
        .map(
          (item) => `
        <div>
          <strong>${item.company}</strong> — ${item.role}
          <p>${item.achievements[0] ?? ''}</p>
        </div>`
        )
        .join('')}
    </div>
    <div>
      <h3>Skills</h3>
      <div>${profile.skills.core.map((skill) => `<span class="tag">${skill}</span>`).join('')}</div>
    </div>
  </section>
</body>
</html>
`;
