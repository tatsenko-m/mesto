const profilePopupElement = document.querySelector('.popup_act_edit-profile');
const cardPopupElement = document.querySelector('.popup_act_add-card');
const imagePopup = document.querySelector('.popup_act_open-img');
const fullSizeImageFromPopupElement = imagePopup.querySelector('.popup__image');
const captionFromPopupElement = imagePopup.querySelector('.popup__caption');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const profileForm = document.forms['editProfile'];
const cardForm = document.forms['addCard'];
const nameInput = profileForm.querySelector('.popup__item_type_name');
const aboutInput = profileForm.querySelector('.popup__item_type_about');
const titleInput = cardForm.querySelector('.popup__item_type_title');
const linkInput = cardForm.querySelector('.popup__item_type_link');
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
  document.addEventListener('keydown', closePopupByPressEsc);
};

function openProfilePopup() {
  assignValuesToEditProfileFormInputs();
  openPopup(profilePopupElement);
  hideAllInputErrors(formValidationConfig);
}

const closePopup = function (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
};

function handleOverlayAndCloseButtonMousedown() {
  const popupList = document.querySelectorAll('.popup')

  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    })
  })
}

function closePopupByPressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value;
  profileSubtitleElement.textContent = aboutInput.value;
  closePopup(profilePopupElement);
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
  cardForm.reset();
  closePopup(cardPopupElement);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);
cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});

handleOverlayAndCloseButtonMousedown();

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCardFormSubmit);

enableValidation(formValidationConfig);



