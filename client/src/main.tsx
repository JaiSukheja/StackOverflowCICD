import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserContextProvider from "./context/UserContextProvider";
import ApiContextProvider from './context/apiContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ApiContextProvider>
  </React.StrictMode>,
)
