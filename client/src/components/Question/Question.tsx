import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import apiContext from '../../context/apiContext';

import './Question.css';
import languageContext from '../../context/languageContext';

const Question = (props: any) => {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [username, setUsername] = useState('');
  const { apiUrl }: any = useContext(apiContext);
  const [translatedText,setTranslatedText] = useState(props.data.text);
  const [translatedTitle,setTranslatedTitle] = useState(props.data.title);
  const { lang }:any = useContext(languageContext);

  useEffect(() => {
    axios
      .get(apiUrl + '/user/' + props.data.user)
      .then((res: any) => {
        setUsername(res.data.username);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  
  
  useEffect(() => {
    if(lang === 'hi' || lang === 'fr'){
      axios.get(`https://api.mymemory.translated.net/get?q=${props.data.text}&langpair=en|${lang}&de=user1@gmail.com`)
      .then((res: any) => {
        setTranslatedText(res.data.responseData.translatedText);
      });
      axios.get(`https://api.mymemory.translated.net/get?q=${props.data.title}&langpair=en|${lang}&de=user1@gmail.com`)
      .then((res: any) => {
        setTranslatedTitle(res.data.responseData.translatedText);
      });
    }
    else{
      setTranslatedText(props.data.text);
      setTranslatedTitle(props.data.title);
    }
  });


  



  return (
    <div className="question">
      <div className="questionContainer">
        <div className="detailsBox">
          <div className="votes">{props.data.upvotes.length} {t('question.votes')}</div>
          <div className="answers">{props.data.answers.length} {t('question.answers')}</div>
          <div className="views">{props.data.views.length} {t('question.views')}</div>
        </div>
        <div className="questionBox">
          <Link to={'/viewquestion/' + props.data._id} className="questionStatement">
            {translatedTitle}
          </Link>
          <div className="questionDescription">{translatedText}</div>
          <div className="questionFooter">
            <div className="tags">
              {props.data.tags.map((item: any, idx: number) => {
                return <Link to={"/"+item} className="tag" key={idx}>{item}</Link>;
              })}
            </div>
            <div className="askedBy">
              {t('question.asked_by')}{' '}
              <Link to={'/profile/' + props.data.user} className="name">
                {username}
              </Link>{' '}
              {t('question.on')}{' '}
              <span className="date">{new Date(props.data.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
