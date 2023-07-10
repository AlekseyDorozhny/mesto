export class Section {
  constructor(renderer, container) {
    this._container = container;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  };


  renderItems() {
    this.items.slice().reverse().forEach((item) => {
      this._renderer(item)
    })
  };

  renderItem(item) {
    this._renderer(item)
  }
}



