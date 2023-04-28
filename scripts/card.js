class Card {
    constructor(data, selectorTemplate, openImage) {
      this._data = data;
      this._link = data.link;
      this._name = data.name;
      this._selectorTemplate = selectorTemplate;
      this._openImage = openImage;
    }
  
    _getTemplate () {
      return document.querySelector(this._selectorTemplate).content.querySelector('.cards__element').cloneNode(true);
    }
  
    _handleLike = () => {
      this._buttonLike.classList.toggle('cards__button-like_active');
    }
  
    _handleDelete = () => {
      this._cloneCard.remove();
    }
  
    _handlePopupOpenImage = () => {
      this._openImage(this._data);
    }
  
    _setEventListener () {
      this._buttonLike.addEventListener ('click', this._handleLike);
      this._buttonDelete.addEventListener('click', this._handleDelete);
      this._photoElement.addEventListener('click', this._handlePopupOpenImage);
    }
  
    createCard () {
      this._cloneCard = this._getTemplate();
      this._buttonLike = this._cloneCard.querySelector('.cards__button-like');
      this._buttonDelete = this._cloneCard.querySelector('.cards__button-delete');
      this._photoElement = this._cloneCard.querySelector('.cards__photo');
      this._titleCard = this._cloneCard.querySelector('.cards__title');
      this._setEventListener()
    
      this._photoElement.src = this._link;
      this._photoElement.alt = this._name;
      this._titleCard.textContent = this._name;
    
      return this._cloneCard;
    }
  };

  export default Card;