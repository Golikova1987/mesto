const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const nameInputElement = popupElement.querySelector('.popup__field-name');
const jobInputElement = popupElement.querySelector('.popup__field-description');
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
};

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileNameElement.textContent = nameInputElement.value;
    profileDescriptionElement.textContent = jobInputElement.value;

};


popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

popupElement.addEventListener('submit', handleFormSubmit); 
saveButtonElement.addEventListener('click', closePopup);
