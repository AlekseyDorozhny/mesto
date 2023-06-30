export class Api {
  constructor(cohort, key) {
    this._cohort = cohort;
    this.key = key;
  };

  async getInitialCards() {
    await fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this.key
      }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      this.cardData = result;
    })
  };

  getUserInfo(callBack, uxCallback) {
    fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
  headers: {
    authorization: this.key
  }
}).then(res => res.json())
  .then(result => {
      this.name = result.name;
      this.activity = result.about;
      this.avatar = result.avatar;
    }).then(() => {callBack()})
    .then(() => {uxCallback()})
  }

  sendUserInfo(name, about, callBack) {
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
}).then(() => callBack())
  };

  sendUserAvatar(url, callBack) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
  method: 'PATCH',
  headers: {
    authorization: this.key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: url
  })
}).then(() => callBack())
  };

  likeHendler(method) {
    fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes `, {
  method: method,
  headers: {
    authorization: this.key
  },
})
  }
};


