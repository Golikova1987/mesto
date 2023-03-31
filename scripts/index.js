// попап редактирование профиля
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const nameInputElement = popupElement.querySelector('.popup__input_text_name');
const jobInputElement = popupElement.querySelector('.popup__input_text_description');
const saveButtonElement = popupElement.querySelector('.popup__button-save');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

//template добавляю массив с карточками
const cardsElement = document.querySelector('.cards__elements');

//создание новой карточки
const formButton = document.querySelector('.popup__save-card');
const nameInput = document.querySelector('.popup__input_name');
const linkInput = document.querySelector('.popup__input_link');

//попап добавить место
const popupMestoElement = document.querySelector('.popup__mesto');
const popupOpenButtonElement = document.querySelector('.profile__add-button');
const linkImageElement = document.querySelector('.popup__input_link');
const popupCloseButtonMesto = popupMestoElement.querySelector('.popup__close-mesto');

//попап открытие картинки
const popupOpenImageElement = document.querySelector('.popup__open-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//попап редактирование профиля

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

//template добавляю массив с карточками
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

initialCards.forEach(item => {
  const newCard = createCard (item);
  cardsElement.append(newCard);
});

  function createCard (item) {
    const htmlElement = document.querySelector('.cards__template').content.cloneNode(true);
    const likeButton = htmlElement.querySelector('.cards__button-like');
    const deleteButton = htmlElement.querySelector('.cards__button-delete');
    const cardsPhotoElement = htmlElement.querySelector('.cards__photo');

    cardsPhotoElement.setAttribute('src', item.link);
    cardsPhotoElement.setAttribute('alt', item.alt);

    const cardsNameElement = htmlElement.querySelector('.cards__title');
    cardsNameElement.textContent = item.name;

    likeButton.addEventListener ('click', () =>
    likeButton.classList.toggle('cards__button-like_active'));

    deleteButton.addEventListener('click', handleDelete);

    cardsPhotoElement.addEventListener('click', function() {
      openImage(popupOpenImageElement);
      popupImage.src = cardsPhotoElement.src;
      popupCaption.textContent = cardsNameElement.textContent;
    });

    return htmlElement;
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    const card = {name: nameInput.value, link: linkInput.value};
  
    const newCard = createCard(card);
    cardsElement.prepend(newCard);

    closePopupMesto();
  };

// удаление карточки

function handleDelete (event) {
  const card = event.target.closest('.cards__element');
  card.remove();
}

// попап добавить место

const openPopupMesto = function () {
    popupMestoElement.classList.add("popup_is-opened");
};

const closePopupMesto = function () {
    popupMestoElement.classList.remove("popup_is-opened");
};

//попап открытие картинки

  const popupCloseImage = document.querySelector('.popup__close-image');
  
  function openImage (event) {
    popupOpenImageElement.classList.add('popup_is-opened');
  }

  const closeImage = function () {
    popupOpenImageElement.classList.remove('popup_is-opened');
  }

popupCloseImage.addEventListener('click', closeImage);

//попап редактирование профиля
popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', handleFormSubmit); 

//создание карточки
formButton.addEventListener('click', handleSubmit);

//попап добавить место
popupOpenButtonElement.addEventListener('click', openPopupMesto);
popupCloseButtonMesto.addEventListener('click', closePopupMesto);
popupMestoElement.addEventListener('click', closePopupByClickOnOverlay);
