const imageCardContainer = document.querySelector('.elements');
class Card {
  constructor (data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
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
    const likeElement = element.querySelector('.element__like');

    trashElement.addEventListener ('click', () => {
      element.remove();
    });

    likeElement.addEventListener ('click', (evt) => {
      evt.target.classList.toggle('element__like_status_active');
      this._isLiked = true;
    });

    /*this.element.addEventListener ('click', () => {
      openPopup(imageViewPopup);
      imageViewImage.src = this._link;
      imageViewImage.alt = `Изображение добавленное пользователем, название ${this._name}`;
      imageViewName.textContent = this._name;
    });*/
  };

  _generateCard() {
    const element = this._getTemplate();
    this._setEventListener(element);
    element.querySelector('.element__image').src = this._link;
    element.querySelector('.element__name').textContent = this._name;
    return element;
  };

};

const renderElements = () => {
  initialCards.forEach((item) => {
    const card = new Card (item, '.card-template');
    const CardElement = card._generateCard();
    imageCardContainer.append(CardElement);
  });
};

renderElements();

const renderNewElement = (name, link) => {
  const data = {};
  data.name = name;
  data.link = link;
  const card = new Card (data, '.card-template');
  const CardElement = card._generateCard();
  imageCardContainer.prepend(CardElement);
}

