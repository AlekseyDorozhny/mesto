export class Card {
  constructor (
    {data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector, userId) {
      this._templateSelector = templateSelector;
      this.name = data.name;
      this.link = data.link;
      this.likes = data.likes;
      this.owner = data.owner;
      this.handleCardClick = handleCardClick;
      this.handleLikeClick = handleLikeClick;
      this.handleDeleteIconClick = handleDeleteIconClick;
      this._elementImage = 'Присваивается ниже';
      this._id = data._id;
      this._userId = userId;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
    return cardElement;
  };

  _setEventListener(element) {
    this.trashElement = element.querySelector('.element__trash');
    this.likeElement = element.querySelector('.element__like');
    this._elementImage = element.querySelector('.element__image');

    this.trashElement.addEventListener('click', () => {
      this.handleDeleteIconClick(this._id, element);
    });

    this.likeElement.addEventListener('click', (evt) => {
      this.handleLikeClick(this._id);
    });

    this._elementImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  };

  likeChecker() {
    this.liked = this.likes.some(e => e._id === this._userId)
  };

  likeCounterHendler() {
    this.likeChecker(this._userId);
    this.likeCounter.textContent = this.likes.length;
    this.likeToggler()
  }

  likeToggler() {
    if (this.liked) {
      this.likeElement.classList.add('element__like_status_active')
    } else {
      this.likeElement.classList.remove('element__like_status_active')
    }
  }

  generateCard() {
    this.element = this._getTemplate();
    this.likeCounter = this.element.querySelector('.element__like-counter');
    const name = this.element.querySelector('.element__name');
    this._setEventListener(this.element);
    this.likeCounterHendler()
    this.likeToggler();
    this._elementImage.src = this.link;
    name.textContent = this.name;
    this._elementImage.alt = `Изображение добавленное пользователем, название ${this.name}`;
    if (this.owner._id === this._userId) {
      this.trashElement.style = `display: block`
    }
    return this.element;
  };
};
