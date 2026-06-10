const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  if (errorElement) {
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  if (errorElement) {
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }
};

const getCustomErrorMessage = (inputElement) => {
  return inputElement.dataset.errorMessage || null;
};

const checkInputValidity = (formElement, inputElement, settings) => {
  const isValid = inputElement.validity.valid;
  
  if (!isValid) {
    let errorMessage = inputElement.validationMessage;
    const customMessage = getCustomErrorMessage(inputElement);
    
    const shouldUseCustomMessage = customMessage && 
      (inputElement.validity.patternMismatch || inputElement.validity.valueMissing);
    
    if (shouldUseCustomMessage) {
      errorMessage = customMessage;
    }

    showInputError(formElement, inputElement, errorMessage, settings);
    return false;
  }
  
  hideInputError(formElement, inputElement, settings);
  return true;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const disableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
};

const enableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  const isAnyInputInvalid = hasInvalidInput(inputList);
  
  if (isAnyInputInvalid) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    const handleInputChange = () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    };
    
    inputElement.addEventListener('input', handleInputChange);
  });
};

export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  const hasInputs = inputList.length > 0;
  
  if (hasInputs) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};