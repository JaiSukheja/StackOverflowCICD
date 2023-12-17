import Sidebar from '../../components/Sidebar/Sidebar';
import './NotFound.css';
import { useTranslation } from 'react-i18next';

const NotFound = (props: any) => {
  const { t } = useTranslation();
  const activeLink = props.activeLink;

  return (
    <div className="notFound">
      <Sidebar activeLink={activeLink} />
      <div className="notFoundContainer">
        <h1 className="notFoundHeading">{t('notFound.newFunctionality')}</h1>
      </div>
    </div>
  );
};

export default NotFound;
