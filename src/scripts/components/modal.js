const handleEscUp = (evt) => {
  const isEscapeKey = evt.key === "Escape";
  
  if (isEscapeKey) {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModalWindow(activePopup);
  }
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscUp);
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscUp);
};

export const setCloseModalWindowEventListeners = (modalWindow) => {
  const closeButtonElement = modalWindow.querySelector(".popup__close");
  
  const handleCloseClick = () => {
    closeModalWindow(modalWindow);
  };
  
  closeButtonElement.addEventListener("click", handleCloseClick);

  const handleOverlayClick = (evt) => {
    const isOverlayClicked = evt.target.classList.contains("popup");
    
    if (isOverlayClicked) {
      closeModalWindow(modalWindow);
    }
  };
  
  modalWindow.addEventListener("mousedown", handleOverlayClick);
};