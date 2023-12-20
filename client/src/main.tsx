import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserContextProvider from "./context/UserContextProvider";
import ApiContextProvider from './context/apiContextProvider.tsx';
import LanguageContextProvider from './context/languageContextProvider.tsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiContextProvider>
      <UserContextProvider>
        <I18nextProvider i18n={i18n}>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </I18nextProvider>
      </UserContextProvider>
    </ApiContextProvider>
  </React.StrictMode>,
)
