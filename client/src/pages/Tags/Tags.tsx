import Sidebar from '../../components/Sidebar/Sidebar';
import './Tags.css';
import { useTranslation } from 'react-i18next';

const Tags = () => {
  const { t } = useTranslation();

  const tags = [
    {
      name: "javascript",
      text: "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;"
    },
    {
      name: "reactjs",
      text: "For questions about ReactJS, an open-source JavaScript library for building user interfaces."
    },
    {
      name: "react-native",
      text: "For questions about React Native, a framework for building native applications using React."
    },
    {
      name: "nodejs",
      text: "For questions about Node.js, an asynchronous event-driven JavaScript runtime."
    },
    {
      name: "express",
      text: "For questions about Express, a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
    },
    {
      name: "mongodb",
      text: "For questions about MongoDB, a cross-platform document-oriented database."
    },
    {
      name: "mongoose",
      text: "For questions about Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js."
    },
    {
      name: "html",
      text: "For questions about the Hypertext Markup Language, a language used to describe web pages."
    },
    {
      name: "css",
      text: "For questions about Cascading Style Sheets, a language used to describe the formatting of markup documents."
    },
    {
      name: "bootstrap",
      text: "For questions about Bootstrap, a framework for developing responsive, mobile-first websites."
    },
    {
      name: "material-ui",
      text: "For questions about Material-UI, a React UI framework."
    },
    {
      name: "styled-components",
      text: "For questions about styled-components, a CSS-in-JS library for React."
    },
    {
      name: "redux",
      text: "For questions about Redux, a predictable state container for JavaScript apps."
    },
    {
      name: "react-redux",
      text: "For questions about React Redux, a predictable state container for JavaScript apps."
    },
    {
      name: "react-router",
      text: "For questions about React Router, a routing library for React."
    },
    {
      name: "react-router-dom",
      text: "For questions about React Router DOM, a routing library for React."
    },
    {
      name: "react-navigation",
      text: "For questions about React Navigation, a routing library for React Native."
    },
    {
      name: "react-navigation-stack",
      text: "For questions about React Navigation Stack, a stack navigator for React Navigation."
    },
  ];

  return (
    <div className="Tags">
      <Sidebar activeLink={'tags'} />
      <div className="tagsContainer">
        <div className="tagsHeading">{t('tags.tags')}</div>
        <div className="tagsSubHeading">{t('tags.tagDescription')}</div>
        <div className="tagsList">
          {tags.map((tag, index) => (
            <div className="tagBox" key={index}>
              <div className="tagBoxName">{tag.name}</div>
              <div className="tagBoxtext">{tag.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
