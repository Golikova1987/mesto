validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};


const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
  })
    setEventListeners(form, rest)
  })
};

const setEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest)
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest)
      } else {
        enableButton(formButton, rest)
        
      }
      })
  })
}

const checkInputValidity = (input, {inputErrorClass, errorClass, ...rest}) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
  console.log(currentInputErrorContainer)
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = ''
    currentInputErrorContainer.classList.remove(errorClass)
    input.classList.remove(inputErrorClass)
    
  } else {
    currentInputErrorContainer.textContent = input.validationMessage
    currentInputErrorContainer.classList.add(errorClass)
    input.classList.add(inputErrorClass) 
  }
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid);
}

const enableButton = (button, {inactiveButtonClass}) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
}

const disableButton = (button, {inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);
  
  button.setAttribute('disabled', true);
}

enableValidation(validationConfig);


