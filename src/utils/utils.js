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

export const createCard = ({ name, link, likesArr, cardId, ownerId }, popupWithImageInstance, ApiInstance, userId) => {
  const card = new Card({ name, link, likesArr, cardId, ownerId }, cardTemplateId, (name, link) => {
    popupWithImageInstance.open(name, link);
  }, () => {
    const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector, () => {
      const delCard = ApiInstance.deleteCard(cardId);
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
  }, userId);
  const cardElement = card.createCard();
  return cardElement;
};
