import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import AuthForm from './AuthForm';

function Register( {onSubmit, onClose, isSuccess, isOpen} ) {

  // стейт переменная данных формы
  const [formValue, setFormValue] = useState(
    {email: '',
    password: ''}
  );

  // отслеживание ввода в инпуты
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  // функция сабмита - получает данные формы и отправляет их в Арр через пропс онСабмит
  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    onSubmit(email, password);
  }

  return (
    <>
    <AuthForm 
      authTitle='Регистрация'
      onSubmit={handleSubmit}
      data={formValue}
      onChange={handleChange}
      authButtonText='Зарегистрироваться'/>
      <p className='auth__txt'>Уже зарегистрированы? <Link className='auth__txt' to='/sign-in'>Войти</Link></p>
      {isOpen && (
        <InfoTooltip onClose={onClose} isSuccess={isSuccess} isOpen={isOpen}/>
      )}
    </>
  )
}

export default Register;