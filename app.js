/* ===== Config ===== */
const PROFILE = {
  email: "ashokpv.1993@gmail.com",
};

const PROJECTS = [
  {
    name: "CI-CD-MASTERY",
    blurb:
      "Jenkins on Kubernetes with Helm, pre-created PVC workflow, agents, and declarative pipelines. Includes rendered manifests, troubleshooting playbook, and PAT auth hardening.",
    tech: ["Kubernetes", "Helm", "Jenkins", "PVC", "Docker"],
    link: "https://github.com/Ashoky412/CI-CD-MASTERY",
  },
  {
    name: "Docker-mastery",
    blurb:
      "Deep dive into Docker networking, production Dockerfiles, and failure-mode labs tied to K8s behavior.",
    tech: ["Docker", "Networking", "K8s"],
    link: "https://github.com/Ashoky412/Docker-mastery",
  },
  {
    name: "ashok-portfolio",
    blurb:
      "This portfolio source: accessible, fast, SEO-friendly. Built with vanilla HTML/CSS/JS.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Ashoky412/ashok-portfolio",
  },
];

/* ===== Hydrate icons ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (window.feather) window.feather.replace({ width: 18, height: 18 });
});

/* ===== Year in footer ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Mobile nav ===== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    if (window.feather) window.feather.replace();
  });
}

/* ===== Theme toggle (light/dark) ===== */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const setThemeIcon = (mode) => {
    themeToggle.innerHTML = "";
    const i = document.createElement("i");
    i.dataset.feather = mode === "dark" ? "sun" : "moon";
    themeToggle.appendChild(i);
    if (window.feather) window.feather.replace();
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem("theme");
  let dark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("light", !dark);
  setThemeIcon(dark ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    dark = !dark;
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    setThemeIcon(dark ? "dark" : "light");
  });
}

/* ===== Copy email ===== */
const copyEmailBtn = document.getElementById("copyEmail");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    const original = copyEmailBtn.innerHTML;
    copyEmailBtn.innerHTML = '<i data-feather="check"></i> Copied!';
    if (window.feather) window.feather.replace();
    setTimeout(() => {
      copyEmailBtn.innerHTML = original;
      if (window.feather) window.feather.replace();
    }, 1200);
  });
}

/* ===== Render projects ===== */
const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projectsGrid.innerHTML = PROJECTS.map(
    (p) => `
      <article class="card project">
        <div class="project__head">
          <h3>${p.name}</h3>
          <a class="icon-link" href="${p.link}" target="_blank" aria-label="Open project">
            <i data-feather="external-link"></i>
          </a>
        </div>
        <p class="muted">${p.blurb}</p>
        <div class="tags">
          ${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </article>
    `
  ).join("");
  if (window.feather) window.feather.replace();
}

/* ===== Light theme palette (optional) ===== */
const lightCss = `
  .light body { background: #ffffff; color: #111827; }
`;
