export class Api {
  constructor(cohort, key) {
    this._cohort = cohort;
    this.key = key;
  };

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this.key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((result) => {
      this.cardData = result;
      return Promise.resolve
    })
    .catch((err) => {
      console.log(err)
    })
  };

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this.key
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then(result => {
      this.name = result.name;
      this.activity = result.about;
      this.avatar = result.avatar;
      this.userId = result._id;
      return Promise.resolve
    })
    .catch((err) => {
      console.log(err)
    })
  }

  sendUserInfo(name, about) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(() => Promise.resolve)
    .catch((err) => {
      console.log(err)
    })
  };

  sendUserAvatar(url) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    }).then(() => Promise.resolve)
    .catch((err) => {
      console.log(err)
    })
  };

  putLikeHendler(ID) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${ID}/likes `, {
      method: 'PUT',
      headers: {
        authorization: this.key
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((data) => {
      this.resreshedLikeData = data;
      return Promise.resolve})
    .catch((err) => {
      console.log(err)
    })
  }

  deleteLikeHendler(ID) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${ID}/likes `, {
      method: 'DELETE',
      headers: {
        authorization: this.key
      },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((data) => {
      this.resreshedLikeData = data;
      return Promise.resolve})
    .catch((err) => {
      console.log(err)
    })
  }

  sendCard(link, name) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((result) => {
      this.newCard = result;
      return Promise.resolve
    }).catch((err) => {
      console.log(err)
    })
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.key
      },
    }).then(() => Promise.resolve)
    .catch((err) => {
      console.log(err)
    })
  }

};


