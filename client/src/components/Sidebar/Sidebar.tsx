import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import './Sidebar.css';

const Sidebar = (props: any) => {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const activeLink = props.activeLink;

  return (
    <div className="sidebar">
      <div className="linksContainer">
        <Link to="/Home" className={activeLink === 'home' ? 'link active' : 'link'}>
          <i className="bx bxs-home"></i>
          <span className="linkName">{t('sidebar.home')}</span>
        </Link>
        <Link to="/questions" className={activeLink === 'questions' ? 'link active' : 'link'}>
          <i className="bx bx-comment-minus"></i>
          <span className="linkName">{t('sidebar.questions')}</span>
        </Link>
        <Link to="/tags" className={activeLink === 'tags' ? 'link active' : 'link'}>
          <i className="bx bxs-bookmarks"></i>
          <span className="linkName">{t('sidebar.tags')}</span>
        </Link>
        <Link to="/users" className={activeLink === 'users' ? 'link active' : 'link'}>
          <i className="bx bxs-user-account"></i>
          <span className="linkName">{t('sidebar.users')}</span>
        </Link>
        <Link to="/companies" className={activeLink === 'companies' ? 'link active' : 'link'}>
          <i className="bx bxs-briefcase"></i>
          <span className="linkName">{t('sidebar.companies')}</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
