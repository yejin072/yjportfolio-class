const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = themeToggle.querySelector(".theme-toggle-icon");
const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");
const themeStorageKey = "yjportfolio-theme";

let savedTheme = "light";
try {
  const storedTheme = localStorage.getItem(themeStorageKey);
  if (storedTheme === "light" || storedTheme === "dark") {
    savedTheme = storedTheme;
  }
} catch (error) {
  console.warn("테마 설정을 불러오지 못했습니다.", error);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  themeToggleIcon.textContent = isDark ? "☀" : "☾";
  themeToggleLabel.textContent = isDark ? "라이트 모드" : "다크 모드";
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.warn("테마 설정을 저장하지 못했습니다.", error);
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
