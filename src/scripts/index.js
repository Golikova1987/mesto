import '../pages/index.css';
import FormValidator from "./formValidator.js";
import initialCards from "./cards.js";
import Card from "./Сard.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_invalid",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

const profileForm = document.querySelector(".popup__form_profile");
const addMestoForm = document.querySelector(".popup__form_mesto");

const profileFormInstance = new FormValidator(profileForm, validationConfig);
const addMestoFormInstance = new FormValidator(addMestoForm, validationConfig);

addMestoFormInstance.enableValidation();
profileFormInstance.enableValidation();

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddMesto = document.querySelector(".profile__add-button");

const selectorTemplate = ".cards__template";
const cardsSelector = ".cards";
const popupProfileSelector = "#popup-profile";
const popupImageSelector = "#popup-image";
const popupMestoSelector = "#popup-mesto";

const configInfo = {
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
};

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);

const profilePopup = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues());
  profilePopup.close();
  profileFormInstance.disableButton(); //деактивация кнопки
});

const popupMesto = new PopupWithForm(popupMestoSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupMesto.getInputValues()));
  popupMesto.close();
  addMestoFormInstance.disableButton(); //деактивация кнопки
});

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectorTemplate, popupImage.open);
      return card.createCard();
    },
  },
  cardsSelector
);

section.addCardsFromArray();

profilePopup.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

buttonAddMesto.addEventListener("click", () => {
  popupMesto.open();
});
