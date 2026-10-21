const signupForm = document.querySelector("#signup-form");
const passwordInput = document.querySelector("#password");
const togglePasswordButton = document.querySelector("#toggle-password");
const formMessage = document.querySelector("#form-message");
const requirementLength = document.querySelector("#requirement-length");
const requirementUppercase = document.querySelector("#requirement-uppercase");
const requirementNumber = document.querySelector("#requirement-number");

function getPasswordRequirements(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };
}

function updateRequirements() {
  const requirements = getPasswordRequirements(passwordInput.value);

  requirementLength.classList.toggle("requirement--met", requirements.length);
  requirementUppercase.classList.toggle("requirement--met", requirements.uppercase);
  requirementNumber.classList.toggle("requirement--met", requirements.number);
  formMessage.textContent = "";
  formMessage.classList.remove("form-message--error", "form-message--success");
}

passwordInput.addEventListener("input", updateRequirements);

togglePasswordButton.addEventListener("click", () => {
  const passwordIsVisible = passwordInput.type === "text";

  passwordInput.type = passwordIsVisible ? "password" : "text";
  togglePasswordButton.textContent = passwordIsVisible ? "👁️ Mostrar" : "🙈 Ocultar";
  togglePasswordButton.setAttribute("aria-pressed", String(!passwordIsVisible));
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const requirements = getPasswordRequirements(passwordInput.value);
  const isPasswordValid = Object.values(requirements).every(Boolean);

  if (!isPasswordValid) {
    formMessage.textContent = "Completa los 3 requisitos para crear tu cuenta.";
    formMessage.classList.add("form-message--error");
    formMessage.classList.remove("form-message--success");
    return;
  }

  formMessage.textContent = "Cuenta creada";
  formMessage.classList.add("form-message--success");
  formMessage.classList.remove("form-message--error");
});