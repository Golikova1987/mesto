export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
    this._form = this._popup.querySelector('.popup__form');
  }
//закрытие нажатием на Esc
  _handleCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
//закрытие на крестик
  _handleCloseButton = () => {
    this.close();
  }
//закрытие при клике рядом с попапом
  _handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('mousedown', this._handleClickOverlay);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleCloseEsc);//закрытие нажатием на Esc
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleCloseEsc);//закрытие нажатием на Esc
  }
}