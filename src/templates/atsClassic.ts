import { CVProfile } from '@types/cv';

export const atsClassic = (profile: CVProfile) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Helvetica', Arial, sans-serif; margin: 24px; color: #1F2937; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 18px; margin-top: 24px; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px; color: #4B5563; }
    .section { margin-bottom: 16px; }
    .item { margin-bottom: 12px; }
    .bullet { margin-left: 16px; }
    .chip { display: inline-block; background: #E0ECFF; color: #1A73E8; padding: 4px 8px; border-radius: 999px; margin: 2px; font-size: 12px; }
    @media (prefers-color-scheme: dark) {
      body { background: #111827; color: #F9FAFB; }
      h2 { border-color: #374151; }
      .chip { background: #1F2937; color: #93C5FD; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${profile.basic.fullName}</h1>
    <p>${profile.basic.title ?? ''}</p>
    <div class="meta">
      ${profile.basic.email ? `<span>${profile.basic.email}</span>` : ''}
      ${profile.basic.phone ? `<span>${profile.basic.phone}</span>` : ''}
      ${profile.basic.location ? `<span>${profile.basic.location}</span>` : ''}
      ${(profile.basic.socials ?? [])
        .map((social) => `<span>${social.label}: ${social.url}</span>`)
        .join('')}
    </div>
  </header>
  ${profile.basic.summary ? `<section class="section"><h2>Professional Summary</h2><p>${profile.basic.summary}</p></section>` : ''}
  ${profile.work.length
    ? `<section class="section"><h2>Experience</h2>${profile.work
        .map(
          (item) => `
      <div class="item">
        <strong>${item.role}</strong> – ${item.company} ${item.location ? `• ${item.location}` : ''}<br/>
        <em>${item.startDate} – ${item.endDate ?? 'Present'}</em>
        <ul>
          ${item.achievements.map((ach) => `<li class="bullet">${ach}</li>`).join('')}
        </ul>
      </div>`
        )
        .join('')}</section>`
    : ''}
  ${profile.education.length
    ? `<section class="section"><h2>Education</h2>${profile.education
        .map(
          (item) => `
      <div class="item">
        <strong>${item.degree}</strong> – ${item.school}<br/>
        <em>${item.startDate ?? ''} – ${item.endDate ?? ''}</em>
      </div>`
        )
        .join('')}</section>`
    : ''}
  ${profile.skills.core.length
    ? `<section class="section"><h2>Skills</h2><div>${profile.skills.core
        .map((skill) => `<span class="chip">${skill}</span>`)
        .join('')}</div></section>`
    : ''}
</body>
</html>
`;
