import {imageViewPopup, imageViewImage, imageViewName} from '../utils/constants.js'
import {openPopup} from '../utils/utils.js'


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
    imageViewImage.alt = `Изображение добавленное пользователем, название: ${this._name}`;
    imageViewName.textContent = elementName.textContent;
    });
  };

  _generateCard() {
    const element = this._getTemplate();
    const name = element.querySelector('.element__name');
    this._setEventListener(element);
    element.querySelector('.element__image').src = this._link;
    name.textContent = this._name;
    name.alt = `Изображение добавленное пользователем, название ${this._name}`;

    return element;
  };

};
