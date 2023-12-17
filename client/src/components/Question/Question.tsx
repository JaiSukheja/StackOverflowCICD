import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import apiContext from '../../context/apiContext';

import './Question.css';

const Question = (props: any) => {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [username, setUsername] = useState('');
  const { apiUrl }: any = useContext(apiContext);

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
            {props.data.title}
          </Link>
          <div className="questionDescription">{props.data.text}</div>
          <div className="questionFooter">
            <div className="tags">
              {props.data.tags.map((item: any, idx: number) => {
                return <div className="tag" key={idx}>{item}</div>;
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
