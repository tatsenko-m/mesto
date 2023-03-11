class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape' && this._popupElement.classList.contains('.popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtonElement = this._popupElement.querySelector('.popup__close-button');
    this._closeButtonElement.addEventListener('mousedown', this.close.bind(this));
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }});
  }
}

export default Popup;
