class Card {
  constructor({ name, link, likesArr, cardId, ownerId }, templateSelector, handleCardClick, handleDelButtonClick, userId, api) {
    this._name = name;
    this._link = link;
    this._likesArr = likesArr;
    this._likesNumber = likesArr.length;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelButtonClick = handleDelButtonClick;
    this._api = api;
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
    this._setEventListeners(this._userId);

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = 'Фото ' + this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    if (this._likesArr.some(obj => obj._id === this._userId)) {
      this._likeButtonElement.classList.add('card__like-button_active');
    } else {
      this._likeButtonElement.classList.remove('card__like-button_active');
    }

    this._likeCounter.textContent = this._likesNumber;

    return this._element;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard(cardId) {
    if (this._likesArr.some(obj => obj._id === this._userId)) {
      this._api.unlikeCard(cardId)
      .then(() => {
        this._likeButtonElement.classList.remove('card__like-button_active');
        return this._api.getInitialCards();
      })
      .then((data) => {
        this._likeCounter.textContent = data.find(obj => obj._id === cardId).likes.length;
      })
      .catch((err) => alert(err));
    } else {
      this._api.likeCard(cardId)
      .then(() => {
        this._likeButtonElement.classList.add('card__like-button_active');
        return this._api.getInitialCards();
      })
      .then((data) => {
        this._likeCounter.textContent = data.find(obj => obj._id === cardId).likes.length;
      })
      .catch((err) => alert(err));
    }
  }

  _setEventListeners() {
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    if (this._ownerId !== this._userId) {
      this._deleteButtonElement.remove();
      this._deleteButtonElement = null;
    } else {
      this._deleteButtonElement.addEventListener('click', () => {
        this._handleDelButtonClick();
      });
    }

    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeCard(this._cardId);
    });
  }
}

export default Card;
