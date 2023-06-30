export class Api {
  constructor(cohort, key) {
    this._cohort = cohort;
    this.key = key;
  };

  getInitialCards(resolve) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this.key
      }
    })
    .then(res => res.json())
    .then((result) => {
      this.cardData = result;
    }).then(() => resolve())
  };

  getUserInfo(resolve) {
    fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this.key
      }
    })
    .then(res => res.json())
    .then(result => {
      this.name = result.name;
      this.activity = result.about;
      this.avatar = result.avatar;
    }).then(() => {resolve()})
  }

  sendUserInfo(name, about, resolve) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(() => {resolve()})
  };

  sendUserAvatar(url, resolve) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    }).then(() => resolve())
  };

  likeHendler(method) {
    fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes `, {
      method: method,
      headers: {
        authorization: this.key
      },
    })
  }

  sendCard(link, name, resolve) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
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
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }).then(() => {resolve()})
  }
};


