class Section {
  constructor({ items, renderer }, containerSelector, api) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._api = api;
    this.updateItems = this.updateItems.bind(this);
  }

  updateItems() {
    this._api.getInitialCards()
    .then((data) => {
      this._items = data;
      this.renderItems();
    })
    .catch((err) => alert(err));
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}

export default Section;
