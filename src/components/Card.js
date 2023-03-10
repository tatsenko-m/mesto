class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = 'Фото ' + this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');

    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }
}

export default Card;
