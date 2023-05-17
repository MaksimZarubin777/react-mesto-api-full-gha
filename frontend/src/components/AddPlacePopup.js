import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup( {isOpen, onClose, onPlaceAdd} ) {

  const [name, setName] = useState({}); 
  const [link, setLink] = useState({});

  function handlename(evt) {
    setName(evt.target.value)
  };

  function handleCardLink(evt) {
    setLink(evt.target.value)
  };

  function handleSubmit(e) {
    e.preventDefault();
    onPlaceAdd({name, link})
  };

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  return(
    <PopupWithForm 
      name='place' 
      title='Новое место' 
      buttonText='Создать'
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input 
          id="place-name" 
          name="placeName" 
          placeholder="Название" 
          type="text" 
          value={name}
          onChange={handlename} 
          className="popup__input"
          required 
          minLength="2" 
          maxLength="200" />
        <span className='popup__input-error'  id="place-name-text-error"></span>
        <input 
          id="place-img" 
          name="placeLink" 
          placeholder="Ссылка на картинку" 
          type="url" 
          value={link}
          onChange={handleCardLink}
          className="popup__input"
          required />
        <span className='popup__input-error'  id="place-name-text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;