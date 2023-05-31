class Card {
    constructor(data, selectorTemplate, openImage, openPopupDeleteCard, changeLike) {
      //console.log(data);
      this._data = data;
      this._link = data.link;
      this._name = data.name;
      this._myId = data.myid;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._likes = data.likes;
      this._likesLength = data.likes.length;
      this._changeLike = changeLike;
      this._selectorTemplate = selectorTemplate;
      this._openImage = openImage;
      this._openPopupDeleteCard = openPopupDeleteCard;
      //console.log(this._myId)
      //console.log(this._ownerId)
      //console.log(this._likes)

    }
  
    _getTemplate() {
      return document.querySelector(this._selectorTemplate).content.querySelector('.cards__element').cloneNode(true);
    }
  
    _handleLike = () => {
      this._changeLike(this._buttonLike, this._cardId)
    }

    _checkLike() {
      this._likes.forEach(element => {
        if (element._id === this._myId) {
          this._buttonLike.classList.add('cards__button-like_active')
          return
        }
      })
      this._numberLikes.textContent = this._likesLength
    }

    toggleLike(likes) {
      this._buttonLike.classList.toggle('cards__button-like_active')
      this._numberLikes.textContent = likes.length
    }
  
    _handleDelete = () => {
      this._openPopupDeleteCard({ card: this, cardId: this._cardId });
    }

    removeCard() {
      this._cloneCard.remove();
      this._cloneCard = null;
    }
  
    _handlePopupOpenImage = () => {
      this._openImage(this._data);
    }
  
    _setEventListener() {
      this._buttonLike.addEventListener('click', this._handleLike);
      this._buttonDelete.addEventListener('click', this._handleDelete);
      this._photoElement.addEventListener('click', this._handlePopupOpenImage);
    }
  //cтавлю мусорку только на свои карточки
    _changeVisibleForButtonDelete() {
      this._myId === this._ownerId ? this._buttonDelete.style.display = 'block' : this._buttonDelete.style.display = 'none';
    }
  
    createCard() {
      this._cloneCard = this._getTemplate();
      this._buttonLike = this._cloneCard.querySelector('.cards__button-like');
      this._buttonDelete = this._cloneCard.querySelector('.cards__button-delete');
      this._photoElement = this._cloneCard.querySelector('.cards__photo');
      this._titleCard = this._cloneCard.querySelector('.cards__title');
      this._numberLikes = this._cloneCard.querySelector('.cards__number-likes');
      this._setEventListener();
    
      this._photoElement.src = this._link;
      this._photoElement.alt = this._name;
      this._titleCard.textContent = this._name;
      this._changeVisibleForButtonDelete();
      this._checkLike();
    
      return this._cloneCard;
    }
  };

  export default Card;