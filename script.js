const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

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

const contactForm = document.querySelector("#contact-form");
const contactFields = [
  document.querySelector("#contact-name"),
  document.querySelector("#contact-email"),
  document.querySelector("#contact-message")
];
const contactFeedback = document.querySelector("#contact-feedback");

function setFieldError(field, message) {
  document.querySelector(`#${field.id}-error`).textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

contactFields.forEach((field) => {
  field.addEventListener("input", () => {
    setFieldError(field, "");
    contactFeedback.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactFeedback.textContent = "";

  const [nameField, emailField, messageField] = contactFields;
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();
  const errors = [
    name ? "" : "이름을 입력해 주세요.",
    !email ? "이메일을 입력해 주세요." : emailField.validity.typeMismatch ? "올바른 이메일 주소를 입력해 주세요." : "",
    message ? "" : "메시지를 입력해 주세요."
  ];

  contactFields.forEach((field, index) => setFieldError(field, errors[index]));

  const firstInvalidField = contactFields.find((field, index) => errors[index]);
  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  contactFeedback.textContent = "모든 항목이 올바르게 입력되었습니다. (실제 이메일은 전송되지 않습니다.)";
});
