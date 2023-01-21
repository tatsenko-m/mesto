const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profilePopupElement = document.querySelector('.popup-edit-profile');
const cardPopupElement = document.querySelector('.popup-add-card');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
const cardPopupCloseButtonElement = cardPopupElement.querySelector('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const cardPopupOpenButtonElement = document.querySelector('.profile__add-button');
const editProfileFormElement = profilePopupElement.querySelector('.popup__form');
const addCardFormElement = cardPopupElement.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__item_el_name');
const aboutInput = editProfileFormElement.querySelector('.popup__item_el_about');
const titleInput = addCardFormElement.querySelector('.popup__item_el_title');
const linkInput = addCardFormElement.querySelector('.popup__item_el_link');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const template = document.querySelector('#card-template');
const galleryList = document.querySelector('.gallery__list');

function assignValuesToEditProfileFormInputs() {
  nameInput.value = profileTitleElement.textContent;
  aboutInput.value = profileSubtitleElement.textContent;
}

const openPopup = function (element) {
  element.classList.add('popup_opened');
  if (element = profilePopupElement) assignValuesToEditProfileFormInputs();
};

const closePopup = function (element) {
  element.classList.remove('popup_opened');
  if (element = profilePopupElement) assignValuesToEditProfileFormInputs();
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = `${nameInput.value}`;
  profileSubtitleElement.textContent = `${aboutInput.value}`;
  closePopup(profilePopupElement);
}

function createCard (cardTitle, cardLink) {
  const cardElement = template.content.querySelector('.card').cloneNode(true);

  const cardTitleElement = cardElement.querySelector('.card__title');
  cardTitleElement.textContent = cardTitle;

  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = cardLink;
  cardImageElement.alt = 'Фото ' + cardTitle;

  const likeButtonElement = cardElement.querySelector('.card__like-button');
  likeButtonElement.addEventListener('click', () => {
    likeButtonElement.classList.toggle('card__like-button_active');
  });

  const deleteButtonElement = cardElement.querySelector('.card__delete-button');
  deleteButtonElement.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard (cardTitle, cardLink) {
  galleryList.prepend(createCard(cardTitle, cardLink));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = `${titleInput.value}`;
  const cardLink = `${linkInput.value}`;
  renderCard (cardTitle, cardLink);
  closePopup(cardPopupElement);
  titleInput.value = '';
  linkInput.value = '';
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

profilePopupOpenButtonElement.addEventListener('click', function(){openPopup(profilePopupElement)});
profilePopupCloseButtonElement.addEventListener('click', function(){closePopup(profilePopupElement)});
editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

cardPopupOpenButtonElement.addEventListener('click', function(){openPopup(cardPopupElement)});
cardPopupCloseButtonElement.addEventListener('click', function(){closePopup(cardPopupElement)});
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);



