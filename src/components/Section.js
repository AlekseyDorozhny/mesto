export class Section {
  constructor(renderer, containerSelector) {
    this._container = containerSelector;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  };


  renderItems() {
    this._items.slice().reverse().forEach((item) => {
      this._renderer(item)
    })
  };

  renderItem(item) {
    console.log(item)
    this._renderer(item)
  }
}



