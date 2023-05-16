import "../pages/index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import initialCards from "../scripts/utils/cards.js";
import Card from "../scripts/components/Сard.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";

import {
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
} from "../scripts/utils/constants.js";

const profileFormInstance = new FormValidator(profileForm, validationConfig);
const addMestoFormInstance = new FormValidator(addMestoForm, validationConfig);

addMestoFormInstance.enableValidation();
profileFormInstance.enableValidation();

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);

const profilePopup = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues());
  profilePopup.close();
});

const popupMesto = new PopupWithForm(popupMestoSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupMesto.getInputValues()));
  popupMesto.close();
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
  profileFormInstance.disableButton(); //деактивация кнопки
});

buttonAddMesto.addEventListener("click", () => {
  popupMesto.open();
  addMestoFormInstance.disableButton(); //деактивация кнопки
});
