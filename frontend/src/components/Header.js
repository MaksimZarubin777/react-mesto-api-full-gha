import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header( {loggedIn, handleLogout, headerEmail} ) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  // функция выхода из профиля
  const handleLogingOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
    handleLogout();
  }
  
  return (
    <header className="header">
      <img src={headerLogo} alt="Лого" className="header__logo" />
      {loggedIn ? (
        <div className='header__right-block'>
          <p className='header__text'>{headerEmail}</p>
          <p className='header__link header__link_logout' onClick={handleLogingOut}>
           Выйти
          </p>
        </div>
      ) : currentPath === '/sign-in' ? (
        <Link to='/sign-up' className='header__link'>
          Зарегистрироваться
        </Link>
      ) : (
        <Link to='/sign-in' className='header__link'>
          Войти
        </Link>)}
    </header>
  );
}

export default Header;