const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddMesto = document.querySelector(".profile__add-button");

const profileForm = document.querySelector(".popup__form_profile");
const addMestoForm = document.querySelector(".popup__form_mesto");

const selectorTemplate = ".cards__template";
const cardsSelector = ".cards";
const popupProfileSelector = "#popup-profile";
const popupImageSelector = "#popup-image";
const popupMestoSelector = "#popup-mesto";


const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_invalid",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

const configInfo = {
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
};

export {
  buttonEditProfile,
  buttonAddMesto,
  profileForm,
  addMestoForm,
  selectorTemplate,
  cardsSelector,
  popupProfileSelector,
  popupImageSelector,
  popupMestoSelector,
  validationConfig,
  configInfo
};
