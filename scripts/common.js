const imagePopup = document.querySelector('.popup_act_open-img');
const fullSizeImageFromPopupElement = imagePopup.querySelector('.popup__image');
const captionFromPopupElement = imagePopup.querySelector('.popup__caption');

const openPopup = function (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
};

export { imagePopup, fullSizeImageFromPopupElement, captionFromPopupElement, openPopup };
