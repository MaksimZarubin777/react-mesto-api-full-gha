import React from 'react';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup( {isOpen, onClose, onUpdateUser} ) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    setName(currentUser.name || '')
    setDescription(currentUser.about || '')
  },[currentUser, isOpen])

  function handleName(evt) {
    setName(evt.target.value)
  }

  function handleDescription(evt) {
    setDescription(evt.target.value)
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
  <PopupWithForm 
    name='profile' 
    title='Редактировать профиль' 
    buttonText='Сохранить'
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input 
        id="profile-name" 
        name="profileName" 
        placeholder="Ваше имя" 
        type="text" 
        value={name} 
        onChange={handleName}
        className="popup__input" 
        required 
        minLength="2" 
        maxLength="20" />
    <span className="popup__input-error" id="profile-name-text-error"></span>
      <input 
        id="profile-job" 
        name="profileDescription" 
        placeholder="Расскажите о себе" 
        type="text" 
        value={description}
        onChange={handleDescription}
        className="popup__input" 
        required 
        minLength="2" 
        maxLength="200" />
    <span className="popup__input-error" id="profile-job-text-error"></span>
  </PopupWithForm>)
}

export default EditProfilePopup;

