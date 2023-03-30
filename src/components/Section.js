class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = item => {
      this._isRenderer = true;
      renderer(item);
      this._isRenderer = false;
    };
  }

  addItem(element) {
    if (this._isRenderer) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}

export default Section;
