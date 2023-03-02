const imagePopup = document.querySelector('.popup_act_open-img');
const fullSizeImageFromPopupElement = imagePopup.querySelector('.popup__image');
const captionFromPopupElement = imagePopup.querySelector('.popup__caption');

const openPopup = function (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
};

const closePopup = function (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
};

function closePopupByPressEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { imagePopup, fullSizeImageFromPopupElement, captionFromPopupElement, openPopup, closePopup, closePopupByPressEsc };
