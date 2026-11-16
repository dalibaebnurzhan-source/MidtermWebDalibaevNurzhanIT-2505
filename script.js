"use strict";

const nav = document.querySelector("#main-nav");
const menuButton = document.querySelector(".mobile-menu-toggle");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

function updateActiveNav() {
  const isTrainersPage = document.body.dataset.page === "trainers";
  const hash = window.location.hash.slice(1);
  const activeKey = hash || (isTrainersPage ? "trainers" : "schedule");
  document.querySelectorAll("[data-nav]").forEach(link => {
    const active = link.dataset.nav === activeKey;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", updateActiveNav);
updateActiveNav();

document.querySelectorAll(".accordion-trigger").forEach(button => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(shouldOpen));
    panel.hidden = !shouldOpen;
  });
});

const search = document.getElementById("trainer-search");
const filter = document.getElementById("category-filter");
const cards = [...document.querySelectorAll(".trainer-card")];
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
function filterTrainers() {
  const text = (search?.value || "").toLocaleLowerCase().trim();
  const category = filter?.value || "all";
  let visible = 0;
  cards.forEach(card => {
    const haystack = `${card.dataset.name} ${card.dataset.category}`.toLocaleLowerCase();
    const matches = haystack.includes(text) && (category === "all" || category === card.dataset.category);
    card.hidden = !matches;
    if (matches) visible++;
  });
  if (resultCount) resultCount.textContent = `${visible} coach${visible === 1 ? "" : "es"} found`;
  if (emptyState) emptyState.hidden = visible !== 0;
}
search?.addEventListener("input", filterTrainers);
filter?.addEventListener("change", filterTrainers);
if (cards.length) filterTrainers();

const form = document.getElementById("join-form");
const startDate = document.getElementById("start-date");
const formFeedback = document.getElementById("form-feedback");
if (startDate) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  startDate.min = localToday;
}
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fullName = document.getElementById("full-name").value.trim();
  formFeedback.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = `Thank you, ${fullName}!`;
  const message = document.createElement("span");
  message.textContent = "Your form is valid. This is a frontend demo, so no application was sent. Connect a backend or form service to receive real submissions.";
  formFeedback.append(heading, message);
  formFeedback.hidden = false;
  form.reset();
});

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function updateThemeUI(theme) {
  if (!themeToggleBtn) return;
  if (theme === "light") {
    themeToggleBtn.textContent = "☀️ Light"; 
    themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
  } else {
    themeToggleBtn.textContent ="🌙 Dark"; 
    themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
  }
}

const savedTheme = localStorage.getItem('nurfight-theme') || 'dark';
if (savedTheme === 'light') {
  htmlElement.setAttribute('data-theme', 'light');
} else {
  htmlElement.removeAttribute('data-theme');
}
updateThemeUI(savedTheme);

themeToggleBtn?.addEventListener('click', () => {
  const isLight = htmlElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('nurfight-theme', 'dark');
    updateThemeUI('dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('nurfight-theme', 'light');
    updateThemeUI('light');
  }
});