import React from "react";

function PopupWithForm( {name, title, buttonText, isOpen, onClose, children, onSubmit} ) {

  // закрытие попапа через эскейп
  React.useEffect(() => {
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    }
  });
  
  // закрытие попапа через клик на оверлей
  React.useEffect(() => {
    function handleOverLayClickClose(event){
      const classList = event.target.classList
      if (classList.contains('popup_opened')) {
        onClose()
      }
    }

    document.addEventListener('click', handleOverLayClickClose)

    return () => {
      document.removeEventListener('click', handleOverLayClickClose)
    }
  });

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} id="popup-profile">
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form id={`change-${name}`} name={`form-${name}`} noValidate onSubmit={onSubmit}>
          {children}
          <button type='submit' className="popup__button-submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;