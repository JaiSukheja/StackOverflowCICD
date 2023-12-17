import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import apiContext from '../../context/apiContext';
import './AskQuestion.css';

const AskQuestion = () => {
  const { id } = useParams<any>();
  const { t } = useTranslation();
  const { apiUrl }:any = useContext(apiContext);

  const { user } = useContext<any>(UserContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  const handleClick = () => {
    axios
      .post(apiUrl + '/question', {
        title: title,
        text: text,
        tags: tags.split(' '),
        user: user._id,
      })
      .then((res) => {
        res ? (window.location.href = '/questions') : console.log('error');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editClick = () => {
    axios
      .put(apiUrl + '/question/edit/' + id, {
        title: title,
        text: text,
        tags: tags.split(' '),
        user: user._id,
      })
      .then((res) => {
        res ? (window.location.href = '/questions') : console.log('error');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(apiUrl + '/question/' + id)
        .then((res) => {
          setTitle(res.data.title);
          setText(res.data.text);
          setTags(res.data.tags.join(' '));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="askQuestion">
      <div className="askQuestionHeading">
        {id ? t('editQuestion.heading') : t('askQuestion.heading')}
      </div>
      <div className="askQuestionContent">
        <div className="askQuestionContentHeading">
          <label htmlFor="" className="askQuestionContentLabel">
            {t('askQuestion.title')}
          </label>
          <div className="askQuestionDesc">
            {t('askQuestion.titleDescription')}
          </div>
          <input
            value={title}
            type="text"
            className="askQuestionContentInput"
            placeholder={t('askQuestion.titlePlaceholder')}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="askQuestionContentHeading">
          <label htmlFor="" className="askQuestionContentLabel">
            {t('askQuestion.body')}
          </label>
          <div className="askQuestionDesc">
            {t('askQuestion.bodyDescription')}
          </div>
          <textarea
            value={text}
            className="askQuestionContentTextarea"
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder={t('askQuestion.bodyPlaceholder')}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="askQuestionContentHeading">
          <label htmlFor="" className="askQuestionContentLabel">
            {t('askQuestion.tags')}
          </label>
          <div className="askQuestionDesc">
            {t('askQuestion.tagsDescription')}
          </div>
          <input
            value={tags}
            type="text"
            className="askQuestionContentInput"
            placeholder={t('askQuestion.tagsPlaceholder')}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>
      <button
        className="askQuestionContentBtn"
        onClick={id ? editClick : handleClick}
        disabled={title.length === 0 || text.length === 0 || tags.length === 0}
      >
        {id ? t('editQuestion.post') : t('askQuestion.post')}
      </button>
    </div>
  );
};

export default AskQuestion;
