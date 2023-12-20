import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';

import apiContext from '../../context/apiContext';
import logoimg from '../../assets/Stack_Overflow.png';

import './Navbar.css';
import LanguageSelector from '../languageSelector/languageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const {
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    userId,
  }:any = useContext(UserContext);
  const { apiUrl }:any = useContext(apiContext);
  const [show,setShow] = useState(true);

  const handleLogout = async () => {
    axios
      .put(`${apiUrl}/user/logout/${token}`)
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem('StackOverflowToken');
        localStorage.removeItem('StackOverflowUsername');
        setUsername('');
        setIsLoggedIn(false);
        setToken('');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="navbar">
      <div className="menuIcon">
        {show ? <i className="bx bx-menu" onClick={()=>{setShow(!show)}}></i> : <i className="bx bx-x" onClick={()=>{setShow(!show)}}></i>}
      </div>
      <div className= {show ? "navbarContainer": "navbarContainer show"}>  
        <Link to="/" className="logo">
          <img src={logoimg} alt="" className="logoImg" />
        </Link>      
        <div className="navlinks">
          <Link to="/about" className="navlink" onClick={()=>{setShow(!show)}}>
            {t('navbar.about')}
          </Link>
          <Link to="/questions" className="navlink" onClick={()=>{setShow(!show)}}>
            {t('navbar.product')}
          </Link>
          <Link to="/forteams" className="navlink" onClick={()=>{setShow(!show)}}>
            {t('navbar.forTeams')}
          </Link>
          <LanguageSelector />
        </div>
        <div className="searchbar">
          <i className="bx bx-search"></i>
          <input type="text" placeholder={t('navbar.searchPlaceholder')} />
        </div>
        <div className="Auth">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="loginBtn" onClick={()=>{setShow(!show)}}>
                {t('navbar.login')}
              </Link>
              <Link to="/signup" className="signupBtn" onClick={()=>{setShow(!show)}}>
                {t('navbar.signup')}
              </Link>
            </>
          ) : (
            <>
              <Link to={`/profile/${userId}`} className="loginBtn" onClick={()=>{setShow(!show)}}>
                <i className="bx bx-user"></i>
                {username}
              </Link>
              <button className="signupBtn" onClick={handleLogout}>
                {t('navbar.logout')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
