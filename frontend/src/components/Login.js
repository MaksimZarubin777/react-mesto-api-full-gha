import React, {useState} from 'react';
import AuthForm from './AuthForm';
import InfoTooltip from './InfoTooltip';

function Login( {onSubmit, onClose, isSuccess, isOpen} ) {

  // стейт переменная данных формы
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  // функция сабмита - получает данные формы и отправляет их в Арр через пропс онСабмит
  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = formValue;
    onSubmit(email, password);
    setFormValue({
      email: '',
      password: ''
    })  
  }

  // отслеживание ввода в инпуты
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]:value
    });
  }

  return (
    <>
      <AuthForm 
        authTitle='Вход'
        onSubmit={handleSubmit}
        data={formValue}
        onChange={handleChange}
        authButtonText='Войти'/>
        {isOpen && (
          <InfoTooltip onClose={onClose} isSuccess={isSuccess} isOpen={isOpen}/>
        )}
    </>
  )
}

export default Login;