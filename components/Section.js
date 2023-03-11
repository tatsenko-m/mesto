class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}

export default Section;
