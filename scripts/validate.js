const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputSelector, inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;

  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { inputSelector, inputErrorClass, errorClass, ...rest }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass, ...rest }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

const configValidation = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__form-btn",
  inactiveButtonClass: "modal__form-btn_inactive",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__message-error",
};

enableValidation(configValidation);

const resetFormValidation = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, rest);
  });

  toggleButtonState(inputList, buttonElement, rest);
};

export { resetFormValidation, configValidation };
