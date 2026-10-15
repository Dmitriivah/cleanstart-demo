const orderButton = document.getElementById("order-btn");
const orderForm = document.getElementById("order-form");
const formMessage = document.getElementById("form-message");
const nameField = document.getElementById("name");
const phoneField = document.getElementById("phone");
const serviceField = document.getElementById("service");

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

orderButton.addEventListener("click", function () {
  scrollToSection("order");
});

orderForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Форма демонстрационная: данные никуда не отправляются

  const name = nameField.value.trim();
  const phone = phoneField.value.trim();
  const service = serviceField.value;

  nameField.classList.toggle("invalid", !name);
  phoneField.classList.toggle("invalid", !phone);
  serviceField.classList.toggle("invalid", !service);

  formMessage.classList.remove("success", "error");

  if (!name || !phone || !service) {
    formMessage.classList.add("error");
    formMessage.textContent = "Пожалуйста, заполните все обязательные поля.";
    return;
  }

  formMessage.classList.add("success");
  formMessage.textContent = "Это демонстрационная форма. Заявка пока не отправляется";
});

[nameField, phoneField, serviceField].forEach(function (field) {
  field.addEventListener("input", function () {
    field.classList.remove("invalid");
  });
});
