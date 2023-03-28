import {openPopup, imageViewPopup, imageViewImage, imageViewName} from './script.js'


export class Card {
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
    const elementImage = element.querySelector('.element__image');
    const elementName = element.querySelector('.element__name');


    trashElement.addEventListener ('click', () => {
      element.remove();
    });

    likeElement.addEventListener ('click', (evt) => {
      evt.target.classList.toggle('element__like_status_active');
      this._isLiked = true;
    });


    elementImage.addEventListener ('click', () => {
      openPopup(imageViewPopup);
    imageViewImage.src = elementImage.src;
    imageViewImage.alt = `Изображение добавленное пользователем, название ${elementName}`;
    imageViewName.textContent = elementName.textContent;
    });
  };

  _generateCard() {
    const element = this._getTemplate();
    this._setEventListener(element);
    element.querySelector('.element__image').src = this._link;
    element.querySelector('.element__name').textContent = this._name;
    return element;
  };

};
