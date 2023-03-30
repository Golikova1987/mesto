// попап редактирование профиля
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const nameInputElement = popupElement.querySelector('.popup__input_text_name');
const jobInputElement = popupElement.querySelector('.popup__input_text_description');
const saveButtonElement = popupElement.querySelector('.popup__button-save');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const openPopup = function () {
  popupElement.classList.add("popup_is-opened");

  nameInputElement.value = profileNameElement.textContent;
  jobInputElement.value = profileDescriptionElement.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup_is-opened");
};

const closePopupByClickOnOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
      return;
  }
  closePopup();
  closePopupMesto();
  
};

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInputElement.value;
  profileDescriptionElement.textContent = jobInputElement.value;

  closePopup();

};

popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', handleFormSubmit); 

//template
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardsTemplate = document.querySelector('.cards__template').content;
const cardsElement = document.querySelector('.cards__elements');

  initialCards.forEach(renderItem);
  
  function renderItem(item) {
    const htmlElement = cardsTemplate.cloneNode(true);
    htmlElement.querySelector('.cards__title').textContent = item.name;
    htmlElement.querySelector('.cards__photo').src = item.link;

    setEventListeners(htmlElement);
    
    cardsElement.append(htmlElement);
  }

//создание новой карточки

const formButton = document.querySelector('.popup__save-card');
const textInput = document.querySelector('.popup__input_text_name');
const linkInput = document.querySelector('.popup__input_link');

function createCard (item) {
  cardsElement = renderItem(item);
  return cardsElement;
}

function handleSubmit (evt) {
  evt.preventDefault();
  const item = [{name: textInput.value, link: linkInput.value}];
  renderItem(item);
  closePopupMesto();

};

formButton.addEventListener('click', handleSubmit);

// удаление карточки

function handleDelete (event) {
  const card = event.target.closest('.cards__element');
  card.remove();

}

function setEventListeners (htmlElement) {
  htmlElement.querySelector('.cards__button-delete').addEventListener('click', handleDelete);
  
}

// лайк 

const likeButton = document.querySelectorAll('.cards__button-like');

likeButton.forEach(activeLike => {
  activeLike.addEventListener('click', function(event) {
    event.target.classList.toggle('cards__button-like_active');
  });
});

// попап добавить место
const popupMestoElement = document.querySelector('.popup__mesto');
const popupOpenButtonElement = document.querySelector('.profile__add-button');
const linkImageElement = document.querySelector('.popup__input_link');
const popupCloseButtonMesto = popupMestoElement.querySelector('.popup__close-mesto');

const cardsNameElement = document.querySelector('.cards__title');
const cardsPhotoElement = document.querySelector('.cards__photo');

const openPopupMesto = function () {
    popupMestoElement.classList.add("popup_is-opened");

    nameInputElement.value = cardsNameElement.textContent;
    linkImageElement.value = cardsPhotoElement.textContent;
};

const closePopupMesto = function () {
    popupMestoElement.classList.remove("popup_is-opened");
};

popupOpenButtonElement.addEventListener('click', openPopupMesto);
popupCloseButtonMesto.addEventListener('click', closePopupMesto);
popupMestoElement.addEventListener('click', closePopupByClickOnOverlay);


//попап открытие картинка
document.addEventListener('DOMContentLoaded', function () {
  const popupOpenImageElement = document.querySelector('.popup__open-image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const popupCloseImage = document.querySelector('.popup__close-image');
  const cardsPhoto = document.querySelectorAll('.cards__photo');

  function openImage (event) {
    popupOpenImageElement.classList.add('popup_is-opened');
    const cardsPhoto = event.target;
    popupImage.src = cardsPhoto.src;
    popupImage.alt = cardsPhoto.alt;
    popupCaption.textContent = cardsPhoto.parentNode.querySelector('.cards__title').textContent;
  }

  const closeImage = function () {
    popupOpenImageElement.classList.remove('popup_is-opened');
  }

  cardsPhoto.forEach(function (cardsPhoto) {
    cardsPhoto.addEventListener('click', openImage);
  });

  popupCloseImage.addEventListener('click', closeImage);

});
