export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }
//загрузка карточек с сервера
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards`, {
      headers: {
        authorization: this._authorization,
      }
   })
   .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  }
//загрузкам информации о пользователе с сервера
  getInfo() {
    return fetch(`https://nomoreparties.co/v1/cohort-66/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
//сохранение отредактированного профиля на сервере
  setUserInfo(data) { 
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
//обновление аватара
  setAvatar(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
//добавление новой карточки
  addCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.mesto,
        link: data.link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
//постановка лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      } 
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
  //удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      } 
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }
//удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }

}
