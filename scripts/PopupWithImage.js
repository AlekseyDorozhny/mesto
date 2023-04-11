import { Popup } from "./Popup";

class PopupWithImage extends Popup {

  open(element) {
    imageViewImage.src = elementImage.src;
    imageViewImage.alt = `Изображение добавленное пользователем, название: ${this._name}`;
    imageViewName.textContent = elementName.textContent;
  }
}
