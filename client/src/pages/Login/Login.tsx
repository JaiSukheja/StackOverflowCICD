import { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/userContext';

import logoimg from '../../assets/logo.png';
import apiContext from '../../context/apiContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const { setIsLoggedIn, setUsername, setToken, setUser }: any = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { apiUrl }: any = useContext(apiContext);

  const handleLogin = async () => {
    axios
      .post(apiUrl + '/user/login', { email, password })
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.removeItem('StackOverflowToken');
        localStorage.setItem('StackOverflowToken', res.data._id);
        localStorage.setItem('StackOverflowUsername', res.data.username);

        setEmail('');
        setPassword('');
        setUsername(res.data.username);
        setToken(res.data._id);
        setUser(res.data);
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <img src={logoimg} alt="logo" className="loginLogoImg" />
        <div className="loginInputContainer">
          <div className="loginInput">
            <label htmlFor="Email" className="loginInputLabel">
              {t('login.email')}
            </label>
            <input
              type="text"
              placeholder={t('login.enterEmail')}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="loginInput">
            <label htmlFor="Password" className="loginInputLabel">
              {t('login.password')}
            </label>
            <input
              type="password"
              placeholder={t('login.enterPassword')}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="loginInput">
            <button className="loginbtn" onClick={handleLogin}>
              {t('login.login')}
            </button>
          </div>
          <div className="loginTerms">
            <a href="/forgotPassword">{t('login.forgotPassword')}</a>
          </div>
          <div className="loginSignup">
            {t('login.noAccount')} <Link to="/signup">{t('login.signup')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
