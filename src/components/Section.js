export class Section {
  constructor(renderer, containerSelector) {
    this._container = containerSelector;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  };


  renderItems() {
    this._renderer(this._items[0])
    /*this._items.forEach((item) => {
      this._renderer(item)
    })*/
  };
}



