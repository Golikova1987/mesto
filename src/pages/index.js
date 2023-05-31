import "../pages/index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Сard.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import Api from "../scripts/components/Api.js";
import PopupDeleteCard from "../scripts/components/PopupDeleteCard.js";

import {
  buttonEditProfile,
  buttonAddMesto,
  profileForm,
  addMestoForm,
  editAvatarForm,
  selectorTemplate,
  cardsSelector,
  popupProfileSelector,
  popupImageSelector,
  popupMestoSelector,
  popupAvatarSelector,
  popupDeleteCardSelector,
  validationConfig,
  configInfo,
  buttonEditAvatar,
} from "../scripts/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "4794d416-5184-43be-8376-438ba82ab5d1",
    "Content-Type": "application/json",
  }
});

const profileFormInstance = new FormValidator(profileForm, validationConfig);
const addMestoFormInstance = new FormValidator(addMestoForm, validationConfig);
const editAvatarFormInstance = new FormValidator(editAvatarForm, validationConfig);

addMestoFormInstance.enableValidation();
profileFormInstance.enableValidation();
editAvatarFormInstance.enableValidation();

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);

const popupCardDelete = new PopupDeleteCard(popupDeleteCardSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard()
    })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
    .finally(() => popupCardDelete.changeTextButton())
    popupCardDelete.close()
})

const profilePopup = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar });
  })
  .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
  .finally(() => profilePopup.changeTextButton())
  profilePopup.close();
});

const popupMesto = new PopupWithForm(popupMestoSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItem(createNewCard(dataCard));
      popupMesto.close();
    })
  .catch((error) => console.error(`ошибка при создании новой карточки ${error}`))
  .finally(() => popupMesto.changeTextButton())
});


function createNewCard(element) {
  const card = new Card(element, selectorTemplate, popupImage.open, popupCardDelete.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('cards__button-like_active')){
      api.deleteLike(cardId)
        .then(res => {
          console.log(res)
          card.toggleLike(res.likes)
        })
        .catch((error => console.error(`Ошибка удаления лайка ${error}`)))
    } else {
      api.addLike(cardId) 
        .then(res => {
          console.log(res)
          card.toggleLike(res.likes)
        })
        .catch((error => console.error(`Ошибка добавления лайка ${error}`)))
    }
  });
  return card.createCard();
}

const section = new Section((element) => {
  section.addItem(createNewCard(element));
}, cardsSelector);

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar })
    })
    .catch((error => console.error(`Ошибка обновления аватара ${error}`)))
    .finally(() => popupEditAvatar.changeTextButton())
    popupEditAvatar.close();
});

profilePopup.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupCardDelete.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
  profileFormInstance.disableButton(); //деактивация кнопки
});

buttonAddMesto.addEventListener("click", () => {
  popupMesto.open();
  addMestoFormInstance.disableButton(); //деактивация кнопки
});

buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  editAvatarFormInstance.disableButton();
});

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    //console.log(dataCard)
    //console.log(dataUser)
    dataCard.forEach(element => element.myid = dataUser._id);
    //console.log(dataCard)
    userInfo.setUserInfo({
      name: dataUser.name,
      description: dataUser.about,
      avatar: dataUser.avatar,
    });
    section.addCardsFromArray(dataCard);
  }
)
.catch((error) => console.error(`ошибка при создании начальных данных ${error}`));
