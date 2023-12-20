import "./About.css";
import logoimg from "../../assets/logo.png";
import companylogo1 from "../../assets/companylogo1.svg";
import companylogo2 from "../../assets/companylogo2.svg";
import companylogo3 from "../../assets/companylogo3.svg";
import companylogo4 from "../../assets/companylogo4.svg";
import companylogo5 from "../../assets/companylogo5.svg";
import companylogo6 from "../../assets/companylogo6.svg";
import companylogo7 from "../../assets/companylogo7.svg";
import companylogo8 from "../../assets/companylogo8.svg";
import companylogo9 from "../../assets/companylogo9.svg";
import companylogo10 from "../../assets/companylogo10.svg";
import stackoverflowimg from "../../assets/Stack-Overflow-logo.webp";
import stackoverflow from "../../assets/Stack_Overflow.png";
import aboutcontentimg from "../../assets/aboutcontent.png";
import aboutimg from "../../assets/aboutimg.jpeg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="aboutHero">
        <img src={logoimg} alt="logo" className="aboutHeroLogo" />
        <div className="aboutHeroTitle">
          {t('about.heroTitle')}
        </div>
        <div className="aboutHeroSubtitle">
          {t('about.heroSubtitle')}
        </div>
      </div>
      <div className="aboutData">
        <div className="dataBox">
          <div className="dataBoxTitle">
            15 years
          </div>
          <div className="dataBoxSubtitle">
            {t('about.dataBoxSubtitle1')}
          </div>
        </div>
        <div className="dataBox">
          <div className="dataBoxTitle">
            14 seconds
          </div>
          <div className="dataBoxSubtitle">
            {t('about.dataBoxSubtitle2')}
          </div>
        </div>
        <div className="dataBox">
          <div className="dataBoxTitle">
            58 million
          </div>
          <div className="dataBoxSubtitle">
            {t('about.dataBoxSubtitle3')}
          </div>
        </div>
        <div className="dataBox">
          <div className="dataBoxTitle">
            51 billion
          </div>
          <div className="dataBoxSubtitle">
            {t('about.dataBoxSubtitle4')}
          </div>
        </div>
      </div>
      <div className="trustingCompanies">
        <div className="trustingCompaniesSubtitle">
          {t('about.trustingCompaniesSubtitle')}
        </div>
        <div className="trustingCompaniesLogos">
            <img src={companylogo1} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo2} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo3} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo4} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo5} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo6} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo7} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo8} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo9} alt="logo" className="trustingCompaniesLogo"/>
            <img src={companylogo10} alt="logo" className="trustingCompaniesLogo"/>
        </div>
      </div>
      <div className="aboutContent">
        <div className="aboutContentLeft">
          <img src={stackoverflowimg} alt="stackoverflow" className="aboutContentLeftImg" />
          <div className="aboutContentDesc">
            {t('about.contentDesc1')}
          </div>
          <div className="aboutContentLinks">
            <Link to="/" className="aboutContentLinkBtn">
              {t('about.learnMore')}
            </Link>
            <Link to="/" className="aboutContentLink">
              {t('about.whatWeAreWorkingOn')} &gt;
            </Link>
          </div>
        </div>
        <div className="aboutContentRight">
          <img src={aboutcontentimg} alt="" className="aboutContentRightImg" />
        </div>
      </div>
      <div className="aboutContent two">
        <div className="aboutContentLeft">
          <img src={stackoverflow} alt="stackoverflow" className="aboutContentLeftImg" />
          <div className="aboutContentDesc">
            {t('about.contentDesc2')}
          </div>
          <div className="aboutContentLinks">
            <Link to="/" className="aboutContentLinkBtn two">
              {t('about.joinCommunity')}
            </Link>
          </div>
        </div>
        <div className="aboutContentRight">
          <img src={aboutimg} alt="" className="aboutContentRightImg" />
        </div>
      </div>
      <div className="aboutContent three">
        <div className="aboutContentLeft">
          <img src={stackoverflow} alt="stackoverflow" className="aboutContentLeftImg" />
          <div className="aboutContentDesc">
            {t('about.contentDesc3')}
          </div>
          <div className="aboutContentLinks">
            <Link to="/" className="aboutContentLinkBtn three">
              {t('about.learnMore')}
            </Link>
            <Link to="/" className="aboutContentLink">
              {t('about.talkToExpert')} &gt;
            </Link>
          </div>
        </div>
        <div className="aboutContentRight">
          <img src={aboutcontentimg} alt="" className="aboutContentRightImg" />
        </div>
      </div>
      <div className="aboutContent four">
        <div className="aboutContentLeft">
          <img src={stackoverflow} alt="stackoverflow" className="aboutContentLeftImg" />
          <div className="aboutContentDesc">
            {t('about.contentDesc4')}
          </div>
          <div className="aboutContentLinks">
            <Link to="/" className="aboutContentLinkBtn four">
              {t('about.exploreSolutions')}
            </Link>
          </div>
        </div>
        <div className="aboutContentRight">
          <img src={aboutcontentimg} alt="" className="aboutContentRightImg" />
        </div>
      </div>
      <div className="aboutLinksBox">
        <div className="aboutLink">
          <i className='bx bxl-graphql'></i>
          <div className="aboutLinkTitle">
            {t('about.checkOutOurFAQ')}
          </div>
          <Link to="/" className="aboutLinkBtn">
            {t('about.visitHelpCenter')}
          </Link>
        </div>
        <div className="aboutLink">
          <i className='bx bx-chat'></i>
          <div className="aboutLinkTitle">
            {t('about.shareFeedback')}
          </div>
          <Link to="/" className="aboutLinkBtn">
            {t('about.visitMeta')}
          </Link>
        </div>
        <div className="aboutLink">
          <i className='bx bx-user'></i>
          <div className="aboutLinkTitle">
            {t('about.lookingForHelp')}
          </div>
          <Link to="/" className="aboutLinkBtn">
            {t('about.visitTeamsHelpCenter')}
          </Link>
        </div>
        <div className="aboutLink">
          <i className='bx bx-file'></i>
          <div className="aboutLinkTitle">
            {t('about.findLegalDocuments')}
          </div>
          <Link to="/" className="aboutLinkBtn">
            {t('about.visitLegal')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
