const profilePopupElement = document.querySelector('.popup_act_edit-profile');
const cardPopupElement = document.querySelector('.popup_act_add-card');
const imagePopup = document.querySelector('.popup_act_open-img');
const fullSizeImageFromPopupElement = imagePopup.querySelector('.popup__image');
const captionFromPopupElement = imagePopup.querySelector('.popup__caption');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
const cardPopupCloseButtonElement = cardPopupElement.querySelector('.popup__close-button');
const imagePopupCloseButtonElement = imagePopup.querySelector('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const profileForm = profilePopupElement.querySelector('.popup__form');
const cardForm = cardPopupElement.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__item_el_name');
const aboutInput = profileForm.querySelector('.popup__item_el_about');
const titleInput = cardForm.querySelector('.popup__item_el_title');
const linkInput = cardForm.querySelector('.popup__item_el_link');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card-template');
const cardsGallery = document.querySelector('.gallery__list');
const cardElement = cardTemplate.content.querySelector('.card');

function assignValuesToEditProfileFormInputs() {
  nameInput.value = profileTitleElement.textContent;
  aboutInput.value = profileSubtitleElement.textContent;
}

const openPopup = function (element) {
  element.classList.add('popup_opened');
};

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
}

const closePopup = function (element) {
  element.classList.remove('popup_opened');
};

function closeProfilePopup() {
  assignValuesToEditProfileFormInputs();
  closePopup(profilePopupElement);
}

function closeCardPopup() {
  cardForm.reset();
  closePopup(cardPopupElement);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = aboutInput.value;
  closeProfilePopup();
}

function createCard (cardTitle, cardLink) {
  const cardElementCopy = cardElement.cloneNode(true);

  const cardTitleElement = cardElementCopy.querySelector('.card__title');
  cardTitleElement.textContent = cardTitle;

  const cardImageElement = cardElementCopy.querySelector('.card__image');
  cardImageElement.src = cardLink;
  cardImageElement.alt = 'Фото ' + cardTitle;

  cardImageElement.addEventListener('click', () => {
    fullSizeImageFromPopupElement.src = cardLink;
    fullSizeImageFromPopupElement.alt = 'Фото ' + cardTitle;
    captionFromPopupElement.textContent = cardTitle;
    openPopup(imagePopup);
  });

  const likeButtonElement = cardElementCopy.querySelector('.card__like-button');
  likeButtonElement.addEventListener('click', () => {
    likeButtonElement.classList.toggle('card__like-button_active');
  });

  const deleteButtonElement = cardElementCopy.querySelector('.card__delete-button');
  deleteButtonElement.addEventListener('click', () => {
    cardElementCopy.remove();
  });

  return cardElementCopy;
}

function renderCard (cardTitle, cardLink) {
  cardsGallery.prepend(createCard(cardTitle, cardLink));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = titleInput.value;
  const cardLink = linkInput.value;
  renderCard (cardTitle, cardLink);
  closeCardPopup();
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
profilePopupCloseButtonElement.addEventListener('click', closeProfilePopup);
profileForm.addEventListener('submit', handleEditProfileFormSubmit);

cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});
cardPopupCloseButtonElement.addEventListener('click', closeCardPopup);
cardForm.addEventListener('submit', handleAddCardFormSubmit);

imagePopupCloseButtonElement.addEventListener('click', function(){closePopup(imagePopup)});



