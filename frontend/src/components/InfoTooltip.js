import React from 'react';
import auth_v from '../images/auth_v.svg';
import auth_x from '../images/auth_x.svg';

function InfoTooltip ( {onClose, isSuccess, isOpen} ) {

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
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popup-auth">
      <div className="popup__container_auth">
        <button className="popup__button-close" id="popup-auth-close" type="button" onClick={onClose}></button>
        {isSuccess ? (
          <>
          <img src={auth_v} className='popup__auth_image'></img>
          <h3 className="popup__auth_h3">Вы успешно зарегистрировались!</h3>
          </>
        ) : (
          <>
          <img src={auth_x} className='popup__auth_image'></img>
          <h3 className="popup__auth_h3">Что-то пошло не так! Попробуйте ещё раз.</h3>
          </>
        )}
      </div>
    </div>
  )
};

export default InfoTooltip;