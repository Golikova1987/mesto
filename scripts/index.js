//попап редактировния профиля
const popupProfile = document.querySelector('#popup-profile');
const formEditProfile = document.querySelector('.popup__form');
const buttonClosePopupList = document.querySelectorAll('.popup__close');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const nameInputElement = popupProfile.querySelector('.popup__input_text_name');
const jobInputElement = popupProfile.querySelector('.popup__input_text_description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

//template добавляю массив с карточками
const cardsElement = document.querySelector('.cards');
const cardsTemplate = document.querySelector('.cards__template').content;

//создание новой карточки
const nameInput = document.querySelector('.popup__input_name');
const linkInput = document.querySelector('.popup__input_link');

//попап добавить место
const popupMesto = document.querySelector('#popup-mesto');
const formAddMesto = popupMesto.querySelector('form[name="form-mesto"]');
const buttonAddMesto = document.querySelector('.profile__add-button');

//попап открытие картинки
const popupOpenImage = document.querySelector('#popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  //закрытие попапов нажатием на Esc
  document.addEventListener('keydown', closePopupKeyEsc);
 
};

const openPopupProfile = function () {
  openPopup(popupProfile);

  nameInputElement.value = profileNameElement.textContent;
  jobInputElement.value = profileDescriptionElement.textContent;
};


const openPopupMesto = function () {
  openPopup(popupMesto);

const input = popupMesto.querySelector('.popup__input')
const buttonSave = popupMesto.querySelector('.popup__button-save')
if (!input.value) {
  buttonSave.classList.add('popup__button-save_invalid')
  buttonSave.setAttribute('disabled', '')
}
};

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  //закрытие попапов нажатием на Esc
  document.removeEventListener('keydown', closePopupKeyEsc);
};

buttonClosePopupList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//закрытие попапов нажатием на Esc
function closePopupKeyEsc (evt) {
  if (evt.key === 'Escape') {
    const keyEsc = document.querySelector('.popup_is-opened');
    closePopup(keyEsc);
  }
};

//закрытие при клике рядом с попапом
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  })
});

//сохранение редактирования профиля
function handleFormSubmitProfile (event) {
  event.preventDefault();

  profileNameElement.textContent = nameInputElement.value;
  profileDescriptionElement.textContent = jobInputElement.value;

  closePopup(popupProfile);

};

//сохранение новой карточки
function handleFormSubmitMesto (event) {
  event.preventDefault();
  const card = {name: nameInput.value, link: linkInput.value};

  const cardNew = createCard(card);
  cardsElement.prepend(cardNew);

  closePopup(popupMesto);
  event.target.reset();//очистить попап
};


//template добавляю массив с карточками

initialCards.forEach(item => {
  const cardNew = createCard (item);
  cardsElement.append(cardNew);
});

  function createCard (item) {
    const htmlElement = cardsTemplate.cloneNode(true);

    const buttonLike = htmlElement.querySelector('.cards__button-like');
    const buttonDelete = htmlElement.querySelector('.cards__button-delete');
    const cardsPhotoElement = htmlElement.querySelector('.cards__photo');

    cardsPhotoElement.setAttribute('src', item.link);
    cardsPhotoElement.setAttribute('alt', item.alt);

    const cardsNameElement = htmlElement.querySelector('.cards__title');
    cardsNameElement.textContent = item.name;

    //лайки
    buttonLike.addEventListener ('click', () =>
    buttonLike.classList.toggle('cards__button-like_active'));

    //урна
    buttonDelete.addEventListener('click', handleDelete);

    //открытие картинки
    cardsPhotoElement.addEventListener('click', function() {
      openPopup(popupOpenImage);
      popupImage.src = cardsPhotoElement.src;
      popupImage.alt = cardsPhotoElement.alt;
      popupCaption.textContent = cardsNameElement.textContent;
    });

    return htmlElement;
  };

// удаление карточки
function handleDelete (event) {
  const card = event.target.closest('.cards__element');
  card.remove();
};

//открытие попапов
buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddMesto.addEventListener('click', openPopupMesto);
//coхранение данных в попапе
formEditProfile.addEventListener('submit', handleFormSubmitProfile); 
formAddMesto.addEventListener('submit', handleFormSubmitMesto);