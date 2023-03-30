import { formValidators, cardTemplateId, popupWithConfirmationSelector } from './constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

export const createCard = ({ name, link, likesArr, cardId, ownerId }, popupWithImageInstance, userId, api) => {
  const card = new Card({ name, link, likesArr, cardId, ownerId }, cardTemplateId, (name, link) => {
    popupWithImageInstance.open(name, link);
  }, () => {
    const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector, () => {
      const delCard = api.deleteCard(cardId);
      delCard
      .then(() => {
        card.handleDeleteCard();
        popupWithConfirmation.close();
        popupWithConfirmation.deletePopup();
      })
      .catch((err) => alert(err));
    });
    popupWithConfirmation.setEventListeners();
    popupWithConfirmation.open();
  }, userId, (cardId) => {
    const isLiked = card._likesArr.some(obj => obj._id === card._userId);

    let fetchPromise;

    if (isLiked) {
      fetchPromise = api.unlikeCard(cardId);
    } else {
      fetchPromise = api.likeCard(cardId);
    }

    fetchPromise
    .then((data) => {
      card._likeButtonElement.classList.toggle('card__like-button_active', !isLiked);
      card._likeCounter.textContent = data.likes.length;
      card._likesArr = data.likes;
    })
    .catch((err) => alert(err));
  });
  const cardElement = card.createCard();
  return cardElement;
};
