export class Section {
  constructor({items, renderer}, containerSelector) {
    this._container = containerSelector;
    this._items = items;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.append(element);
  };

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item)
    })
  };
}



