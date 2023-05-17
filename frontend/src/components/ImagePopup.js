import React from 'react';
function ImagePopup( {card, onClose} ) {
  return (
    <div className={`popup popup_place ${card ? "popup_opened" : ''}`} id="popup-place-info">
      <div className="popup__container-place">
        <button className="popup__button-close" id="popup-confirm-info" type="button" onClick={onClose}></button>
        <img src={card?.link} className="popup__place-img" alt={card?.name} />
        <p className="popup__place-title"></p>
      </div>
    </div>
  )
};

export default ImagePopup;