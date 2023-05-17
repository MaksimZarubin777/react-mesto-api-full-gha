import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';



function EditAvatarPopup( {isOpen, onClose, onUpdateAvatar} ) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar: avatarRef.current.value})
  }

return (
  <PopupWithForm 
    name='avatar' 
    title='Обновить аватар' 
    buttonText='Сохранить'
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input 
        id="avatar-img" 
        name="avatarLink" 
        placeholder="Ссылка на картинку" 
        type="url" 
        className="popup__input" 
        required 
        ref={avatarRef}/>
    <span className="popup__input-error" id="avatar-img-text-error"></span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;