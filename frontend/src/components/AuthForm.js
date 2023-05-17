import React from 'react';
function AuthForm ( {authTitle, onSubmit, data, onChange, authButtonText } ) {
  return (
    <div className='auth'>
      <h2 className='auth__title'>{authTitle}</h2>
      <form className='auth__form' onSubmit={onSubmit}>
        <input className='auth__input' placeholder='Email' name='email' value={data.email} onChange={onChange}/>
        <input className='auth__input' placeholder='Пароль' name='password' type='password' value={data.password} onChange={onChange}/>
        <button className='auth__button'>{authButtonText}</button>
      </form>
    </div>
  )
}

export default AuthForm;