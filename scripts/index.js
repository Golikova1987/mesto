import FormValidator from "./formValidator.js";
import initialCards from "./cards.js";
import Card from "./Сard.js";

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const profileForm = document.querySelector('.popup__form_profile');
const addMestoForm = document.querySelector('.popup__form_mesto');

const profileFormInstance = new FormValidator(profileForm, validationConfig);
const addMestoFormInstance = new FormValidator(addMestoForm, validationConfig);

addMestoFormInstance.enableValidation();
profileFormInstance.enableValidation();


//попап редактировния профиля
const popupProfile = document.querySelector('#popup-profile');

const buttonClosePopupList = document.querySelectorAll('.popup__close');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const nameInputElement = popupProfile.querySelector('.popup__input_text_name');
const jobInputElement = popupProfile.querySelector('.popup__input_text_description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

//template добавляю массив с карточками
const cardsElement = document.querySelector('.cards');
const selectorTemplate = '.cards__template';


//создание новой карточки
const nameInput = document.querySelector('.popup__input_name');
const linkInput = document.querySelector('.popup__input_link');

//попап добавить место
const popupMesto = document.querySelector('#popup-mesto');
const buttonAddMesto = document.querySelector('.profile__add-button');

//попап открытие картинки
const popupOpenImage = document.querySelector('#popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupKeyEsc);//закрытие попапов нажатием на Esc
 
};

const openPopupProfile = function() {
  openPopup(popupProfile);

  nameInputElement.value = profileNameElement.textContent;
  jobInputElement.value = profileDescriptionElement.textContent;
};


const openPopupMesto = function() {
  openPopup(popupMesto)
};

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupKeyEsc);//закрытие попапов нажатием на Esc
};

buttonClosePopupList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//закрытие попапов нажатием на Esc
function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

//закрытие при клике рядом с попапом
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  })
});

//сохранение редактирования профиля
function handleFormSubmitProfile(event) {
  event.preventDefault();

  profileNameElement.textContent = nameInputElement.value;
  profileDescriptionElement.textContent = jobInputElement.value;

  closePopup(popupProfile);
  profileFormInstance.disableButton();//деактивация кнопки

};

//сохранение новой карточки
function handleFormSubmitMesto(event) {
  event.preventDefault();
  const cardData = {name: nameInput.value, link: linkInput.value};

  
  addCard(cardsElement, addNewCard(cardData));

  closePopup(popupMesto);
  event.target.reset();//очистить попап
  addMestoFormInstance.disableButton();//деактивация кнопки
}; 

//открытие попапа с картинкой
function openImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openPopup(popupOpenImage);
};


function addNewCard(item) {
  const card = new Card(item, selectorTemplate, openImage);
  const newCard = card.createCard();
  return newCard;
}

initialCards.forEach(item => {
  addCard(cardsElement, addNewCard(item));
});

function addCard(container, card) {
  container.prepend(card);
}

//открытие попапов
buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddMesto.addEventListener('click', openPopupMesto);
//coхранение данных в попапе
profileForm.addEventListener('submit', handleFormSubmitProfile); 
addMestoForm.addEventListener('submit', handleFormSubmitMesto);