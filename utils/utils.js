export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', escClosePopupHandler);
  document.addEventListener('mousedown', sideClickCloseHandler);
};

export const escClosePopupHandler = (evt) => {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  };
}

const sideClickCloseHandler = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

export function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopupHandler);
  document.removeEventListener('mousedown', sideClickCloseHandler);
};
