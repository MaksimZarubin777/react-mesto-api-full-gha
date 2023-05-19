import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute'
import * as auth from '../auth.js';

function App() {
  //  переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // стейт-переменная для попап с картинкой
  const [selectedCard, setSelectedCard] = useState(null);

  // стейт-переменная карточек
  const [cards, setCards] = React.useState([]);

  // стейт-переменная текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // стейт-переменная статуса авторизации
  const [loggedIn, setLoggedIn] = useState(false);

  // стейт переменная статуса открытия попапа
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // стейт переменная статуса ответа на регистрацию
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  // стейт переменная сохранения email
  const [headerEmail, setHeaderEmail] = useState('');

  const navigate = useNavigate();

  // функция лог-ина
  const handleLogin = (email, password) => {
    auth.signIn(email, password)
    .then((data) => {
      if (data.token) {
        setHeaderEmail(email);
        setLoggedIn(true);
        setIsInfoTooltipOpen(true);
        navigate('/', {replace: true});
      }
    })
    .catch((err) => {
      setLoggedIn(false);
      setIsInfoTooltipOpen(true);
      console.log(err);
    });
    
  }

  // функция регистрации
  const handleRegister = (email, password) => {
    auth.signUp(email, password)
    .then((response) => {
      setIsRegistrationSuccessful(true);
      setIsInfoTooltipOpen(true);
      setTimeout(() => {
        setIsInfoTooltipOpen(false);
        navigate('/sign-in', {replace: true});
      }, 2000);
    })
    .catch((err) => {
      setIsRegistrationSuccessful(false);
      setIsInfoTooltipOpen(true);
      console.error(err);
      console.log('Poluchilos');
    })
  }

  // получение данные профиля
  useEffect(()=>{
    api.getProfileInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => console.log(err));
  },[])

  // получние данных карточек
  useEffect(() => {
    api.getInitialCard()
    .then(cardData => {
      setCards(cardData);
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  // проверка токена
  useEffect(() => {
    tokenCheck();
  },[])

  // функция проверки токена
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token){
      auth.getContent(token)
      .then((res) => {
        if (res) {
          setHeaderEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  // изменение значения состояния попапа профиль
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // изменение значения состояния попапа место
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // изменение значения состояния попапа аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  // клик по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  };
  
  // клик по лайку
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.handleLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  // удаление карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
    .then(() => {
      setCards((previousCards) => previousCards.filter((c) => c._id !== cardId));
    })
    .catch((err) => console.log(err))
  }

  // апдейт аватара
  function handleUpdateAvatar({avatar}) {
    api.avatarUpdate(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  // закрываем попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  // обновляем данные профиля
  function handleUpdateUser(data) {
    api.updateProfileInfo(data)
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  // добавить карточку
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  // меняем стейт переменную при лог-ауте
  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} handleLogout={handleLogout} headerEmail={headerEmail}/>
          <Routes>
            <Route path="/sign-in" element={
              <Login 
                onSubmit={handleLogin}
                onClose={closeAllPopups} 
                isSuccess={loggedIn}
                isOpen={isInfoTooltipOpen}/>}/>
            <Route path="/sign-up" element={
              <Register 
                onSubmit={handleRegister} 
                onClose={closeAllPopups} 
                isSuccess={isRegistrationSuccessful} 
                isOpen={isInfoTooltipOpen}/>}/>
            <Route path="/" element={<ProtectedRouteElement element={
              Main} 
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}/>}
              />
          </Routes>

          {/* попап профиль */}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          
          {/* попап место */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPlaceAdd={handleAddPlaceSubmit}/>

          {/* попап аватар */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          {/* попап картинка */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          
          {loggedIn && <Footer />}
        </CurrentUserContext.Provider>   
      </div>
    </div>
  );
}

export default App;
