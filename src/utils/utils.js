import { formValidators, cardTemplateId } from './constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

export const createCard = ({ name, link, likesNumber, ownerId }, popupWithImageInstance, userId) => {
  const card = new Card({ name, link, likesNumber, ownerId }, cardTemplateId, (name, link) => {
    popupWithImageInstance.open(name, link);
  }, userId);
  const cardElement = card.createCard();
  return cardElement;
};
