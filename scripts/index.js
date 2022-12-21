const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__item_el_name');
const aboutInput = formElement.querySelector('.popup__item_el_about');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

function assignSavedValuesToInputs() {
    nameInput.value = profileTitleElement.textContent;
    aboutInput.value = profileSubtitleElement.textContent;
}

assignSavedValuesToInputs();

const openPopup = function() {
    popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
    assignSavedValuesToInputs();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitleElement.textContent = `${nameInput.value}`;
    profileSubtitleElement.textContent = `${aboutInput.value}`;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
