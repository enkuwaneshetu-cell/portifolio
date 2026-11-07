const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks?.classList.toggle("is-open", !isExpanded);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  });
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const copyButton = document.querySelector(".copy-email");
const toast = document.querySelector(".copy-toast");
let toastTimeout;

copyButton?.addEventListener("click", async () => {
  const email = copyButton.getAttribute("data-email");
  if (!email || !toast) return;

  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied to clipboard";
    toast.classList.remove("is-error");
    copyButton.querySelector(".copy-label").textContent = "Copied!";
  } catch {
    toast.textContent = `Copy failed — email me at ${email}`;
    toast.classList.add("is-error");
  }

  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible", "is-error");
    copyButton.querySelector(".copy-label").textContent = "Copy email";
  }, 2800);
});
