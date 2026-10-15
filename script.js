const orderButton = document.getElementById("order-btn");
const orderForm = document.getElementById("order-form");
const formMessage = document.getElementById("form-message");
const nameField = document.getElementById("name");
const phoneField = document.getElementById("phone");
const serviceField = document.getElementById("service");
const dateField = document.getElementById("date");
const commentField = document.getElementById("comment");

// Вставьте сюда адрес формы Formspree, например: "https://formspree.io/f/xxxxxxxx"
// Пока строка пустая — заявка никуда не отправляется.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkzdozd";

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function setFieldError(field, message) {
  field.classList.toggle("invalid", Boolean(message));
  const errorNode = document.getElementById(field.id + "-error");
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearFieldError(field) {
  setFieldError(field, "");
}

function validateForm() {
  const name = nameField.value.trim();
  const phone = phoneField.value.trim();
  const service = serviceField.value;
  const date = dateField.value.trim();
  let isValid = true;

  if (!name) {
    setFieldError(nameField, "Укажите имя.");
    isValid = false;
  } else {
    clearFieldError(nameField);
  }

  if (!phone) {
    setFieldError(phoneField, "Укажите телефон.");
    isValid = false;
  } else if (phone.replace(/\D/g, "").length < 6) {
    setFieldError(phoneField, "Введите номер полностью, не меньше 6 цифр.");
    isValid = false;
  } else {
    clearFieldError(phoneField);
  }

  if (!service) {
    setFieldError(serviceField, "Выберите услугу.");
    isValid = false;
  } else {
    clearFieldError(serviceField);
  }

  if (!date) {
    setFieldError(dateField, "Укажите желаемую дату.");
    isValid = false;
  } else {
    clearFieldError(dateField);
  }

  clearFieldError(commentField);
  return isValid;
}

orderButton.addEventListener("click", function () {
  scrollToSection("order");
});

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formMessage.classList.remove("info", "error");
  formMessage.textContent = "";

  if (!validateForm()) {
    formMessage.classList.add("error");
    formMessage.textContent = "Проверьте обязательные поля и исправьте ошибки.";
    return;
  }

  if (!FORMSPREE_ENDPOINT) {
    formMessage.classList.add("info");
    formMessage.textContent = "Formspree пока не подключён. Заявка не отправлена.";
    return;
  }

  const formData = new FormData(orderForm);

  fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Formspree returned an error");
      }
      formMessage.classList.add("info");
      formMessage.textContent = "Заявка отправлена через Formspree.";
      orderForm.reset();
    })
    .catch(function () {
      formMessage.classList.add("error");
      formMessage.textContent = "Не удалось отправить заявку. Проверьте адрес Formspree.";
    });
});

[nameField, phoneField, serviceField, dateField, commentField].forEach(function (field) {
  field.addEventListener("input", function () {
    clearFieldError(field);
  });
});
