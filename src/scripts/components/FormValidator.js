class FormValidator {
  constructor(
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      ...rest
    }
  ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._additionalParams = rest;
  }

  enableValidation() {
    this._formInputs = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._setEventListeners();
  }

  _setEventListeners() {
    this.disableButton();
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this.disableButton();
        } else {
          this._enableButton();
        }
      });
    });
  }

  _hasInvalidInput() {
    return this._formInputs.some((item) => !item.validity.valid);
  }

  _checkInputValidity(input) {
    const currentInputErrorContainer = this._form.querySelector(
      `#${input.id}-error`
    );
    if (input.checkValidity()) {
      currentInputErrorContainer.textContent = "";
      currentInputErrorContainer.classList.remove(this._errorClass);
      input.classList.remove(this._inputErrorClass);
    } else {
      currentInputErrorContainer.textContent = input.validationMessage;
      currentInputErrorContainer.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
    }
  }

  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute("disabled");
  }

  disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute("disabled", true);
  }
}

export default FormValidator;
