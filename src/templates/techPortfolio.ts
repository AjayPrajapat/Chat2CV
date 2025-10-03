import { CVProfile } from '@types/cv';

export const techPortfolio = (profile: CVProfile) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Fira Code', monospace; margin: 32px; background: #0f172a; color: #e2e8f0; }
    .title { color: #38bdf8; }
    .section { margin-top: 24px; }
    .project { border-left: 3px solid #38bdf8; padding-left: 16px; margin-bottom: 12px; }
    a { color: #38bdf8; text-decoration: none; }
  </style>
</head>
<body>
  <h1 class="title">${profile.basic.fullName}</h1>
  <p>${profile.basic.summary}</p>
  <div class="section">
    <h2 class="title">Projects</h2>
    ${(profile.projects ?? [])
      .map(
        (project) => `
      <div class="project">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p>${project.highlights.join('<br/>')}</p>
        ${project.link ? `<a href="${project.link}">${project.link}</a>` : ''}
      </div>`
      )
      .join('')}
  </div>
</body>
</html>
`;
