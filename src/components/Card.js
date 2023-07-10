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
    const trashElement = element.querySelector('.element__trash');
    this.trashElement = trashElement;
    this.likeElement = element.querySelector('.element__like');
    const elementImage = element.querySelector('.element__image');
    this._elementImage = elementImage;

    trashElement.addEventListener('click', () => {
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
    const likeCounter = this.element.querySelector('.element__like-counter');
    likeCounter.textContent = this.likes.length;
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
    const element = this._getTemplate();
    this.element = element
    const name = element.querySelector('.element__name');
    this._setEventListener(element);
    this.likeCounterHendler()
    this.likeToggler();
    element.querySelector('.element__image').src = this.link;
    name.textContent = this.name;
    this._elementImage.alt = `Изображение добавленное пользователем, название ${this.name}`;
    if (this.owner._id === this._userId) {
      this.trashElement.style = `display: block`
    }
    return element;
  };
};
