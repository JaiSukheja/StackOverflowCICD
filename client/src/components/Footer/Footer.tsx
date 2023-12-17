import { useTranslation } from 'react-i18next';

import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <p>{t('footer.copyright')}</p>
    </div>
  );
};

export default Footer;
