import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import logoimg from '../../assets/logo.png';
import apiContext from '../../context/apiContext';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { apiUrl }: any = useContext(apiContext);
  const { t } = useTranslation();

  const handleSignup = async () => {
    axios
      .post(apiUrl + '/user/signup', { username, email, password })
      .then((res) => {
        console.log(res.data);
        setEmail('');
        setPassword('');
        setUsername('');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup">
      <div className="signupLeft">
        <div className="signupLeftHeading">{t('signup.joinCommunity')}</div>
        <div className="subPoints">
          <div className="subPoint">
            <i className="bx bxs-message-detail"></i>
            <span>{t('signup.getUnstuck')}</span>
          </div>
          <div className="subPoint">
            <i className="bx bxs-check-circle"></i>
            <span>{t('signup.unlockPrivileges')}</span>
          </div>
          <div className="subPoint">
            <i className="bx bxs-user"></i>
            <span>{t('signup.saveFavorites')}</span>
          </div>
          <div className="subPoint">
            <i className="bx bxs-award"></i>
            <span>{t('signup.earnReputation')}</span>
          </div>
        </div>
      </div>
      <div className="signupRight">
        <img src={logoimg} alt="logo" className="signupLogoImg" />
        <div className="signupInputContainer">
          <div className="signupInput">
            <label htmlFor="Username" className="signupInputLabel">
              {t('signup.username')}
            </label>
            <input
              type="text"
              placeholder={t('signup.enterUsername')}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
          <div className="signupInput">
            <label htmlFor="Email" className="signupInputLabel">
              {t('signup.email')}
            </label>
            <input
              type="text"
              placeholder={t('signup.enterEmail')}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="signupInput">
            <label htmlFor="Password" className="signupInputLabel">
              {t('signup.password')}
            </label>
            <input
              type="password"
              placeholder={t('signup.enterPassword')}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="signupInput">
            <button className="signupbtn" onClick={handleSignup}>
              {t('signup.signup')}
            </button>
          </div>
          <div className="signupTerms">
            {t('signup.byClicking')}{' '}
            <a href="/terms">{t('signup.termsOfService')}</a>,{' '}
            <a href="/policy">{t('signup.privacyPolicy')}</a>, {t('signup.and')}{' '}
            <a href="/cookies">{t('signup.cookiePolicy')}</a>
          </div>
          <div className="signupLogin">
            {t('signup.alreadyHaveAccount')} <Link to="/login">{t('signup.logIn')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
