const orderButton = document.getElementById("order-btn");
const orderForm = document.getElementById("order-form");
const formMessage = document.getElementById("form-message");
const submitButton = orderForm.querySelector('button[type="submit"]');
const submitButtonText = submitButton.textContent;
const successToast = document.getElementById("success-toast");
const nameField = document.getElementById("name");
const phoneField = document.getElementById("phone");
const serviceField = document.getElementById("service");
const dateField = document.getElementById("date");
const commentField = document.getElementById("comment");
const consentField = document.getElementById("consent");

// Укажите адрес формы Formspree, например: "https://formspree.io/f/xxxxxxxx"
// Если оставить строку пустой, заявка не отправится.
// Перед публикацией замените адрес на свой собственный и проверьте его работу.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvkzdozd";
let toastTimeout;

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setMinimumDate() {
  dateField.min = getTodayDate();
}

function showSuccessToast() {
  window.clearTimeout(toastTimeout);
  successToast.hidden = false;
  successToast.classList.add("is-visible");
  toastTimeout = window.setTimeout(function () {
    successToast.classList.remove("is-visible");
    successToast.hidden = true;
  }, 6000);
}

setMinimumDate();

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
  setMinimumDate();
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
  } else if (date < dateField.min) {
    setFieldError(dateField, "Выберите сегодняшнюю или будущую дату.");
    isValid = false;
  } else {
    clearFieldError(dateField);
  }

  if (!consentField.checked) {
    setFieldError(consentField, "Нужно согласие на обработку данных.");
    isValid = false;
  } else {
    clearFieldError(consentField);
  }

  clearFieldError(commentField);
  return isValid;
}

orderButton.addEventListener("click", function () {
  scrollToSection("order");
});

orderForm.addEventListener("submit", async function (event) {
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
    formMessage.textContent = "Не удалось отправить заявку. Пожалуйста, свяжитесь с нами по телефону.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Отправляем заявку…";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(orderForm)
    });
    if (!response.ok) {
      throw new Error("Formspree returned an error");
    }
    formMessage.classList.add("info");
    formMessage.textContent = "Заявка отправлена. Скоро с вами свяжутся.";
    orderForm.reset();
    setMinimumDate();
    showSuccessToast();
  } catch (error) {
    formMessage.classList.add("error");
    formMessage.textContent = "Не удалось отправить заявку. Попробуйте ещё раз позже.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = submitButtonText;
  }
});

[nameField, phoneField, serviceField, dateField, commentField].forEach(function (field) {
  field.addEventListener("input", function () {
    clearFieldError(field);
  });
});

consentField.addEventListener("change", function () {
  clearFieldError(consentField);
});
