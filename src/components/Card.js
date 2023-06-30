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
    this.likeElement = element.querySelector('.element__like');
    const elementImage = element.querySelector('.element__image');
    this._elementImage = elementImage;

    trashElement.addEventListener('click', () => {
      this.handleDeleteIconClick();
    });

    this.likeElement.addEventListener('click', (evt) => {
      this.handleLikeClick();
    });

    this._elementImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  };

  _likeChecker () {
    this.liked = this.likes.includes(this._userId);
  };

  _generateCard() {
    this._likeChecker();
    const element = this._getTemplate();
    const name = element.querySelector('.element__name');
    const likeCounter = element.querySelector('.element__like-counter');
    this._setEventListener(element);

    if (this.liked) {
      this.likeElement.classList.add('element__like_status_active')
    }

    element.querySelector('.element__image').src = this.link;
    name.textContent = this.name;
    name.alt = `Изображение добавленное пользователем, название ${this.name}`;
    likeCounter.textContent = this.likes.length;
    return element;
  };
};
