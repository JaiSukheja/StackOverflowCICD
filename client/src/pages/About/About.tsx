// import "./About.css"
// import logoimg from "../../assets/logo.png"
// import companylogo1 from "../../assets/companylogo1.svg"
// import companylogo2 from "../../assets/companylogo2.svg"
// import companylogo3 from "../../assets/companylogo3.svg"
// import companylogo4 from "../../assets/companylogo4.svg"
// import companylogo5 from "../../assets/companylogo5.svg"
// import companylogo6 from "../../assets/companylogo6.svg"
// import companylogo7 from "../../assets/companylogo7.svg"
// import companylogo8 from "../../assets/companylogo8.svg"
// import companylogo9 from "../../assets/companylogo9.svg"
// import companylogo10 from "../../assets/companylogo10.svg"
// import stackoverflowimg from "../../assets/Stack-Overflow-logo.webp"
// import stackoverflow from "../../assets/Stack_Overflow.png"
// import aboutcontentimg from "../../assets/aboutcontent.png"
// import aboutimg from "../../assets/aboutimg.jpeg"
// import { Link } from "react-router-dom"

// const About = () => {
//   return (
//     <div className="about">
//         <div className="aboutHero">
//             <img src={logoimg} alt="logo" className="aboutHeroLogo"/>
//             <div className="aboutHeroTitle">
//                 Empowering the world to develop technology <strong>through collective knowledge.</strong>
//             </div>
//             <div className="aboutHeroSubtitle">
//                 Our products and tools enable people to ask, share and learn at work or at home.
//             </div>
//         </div>
//         <div className="aboutData">
//             <div className="dataBox">
//                 <div className="dataBoxTitle">
//                     15 years
//                 </div>
//                 <div className="dataBoxSubtitle">
//                     of trusted and high-quality knowledge
//                 </div>
//             </div>
//             <div className="dataBox">
//                 <div className="dataBoxTitle">
//                 14 seconds
//                 </div>
//                 <div className="dataBoxSubtitle">
//                 average time between new questions
//                 </div>
//             </div>
//             <div className="dataBox">
//                 <div className="dataBoxTitle">
//                 58 million
//                 </div>
//                 <div className="dataBoxSubtitle">
//                 total questions and answers so far
//                 </div>
//             </div>
//             <div className="dataBox">
//                 <div className="dataBoxTitle">
//                 51 billion
//                 </div>
//                 <div className="dataBoxSubtitle">
//                 times knowledge has been reused
//                 </div>
//             </div>
//         </div>
//        <div className="trustingCompanies">
//             <div className="trustingCompaniesSubtitle">
//             Supporting the innovative teams at…
//             </div>
//             <div className="trustingCompaniesLogos">
//                 <img src={companylogo1} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo2} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo3} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo4} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo5} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo6} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo7} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo8} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo9} alt="logo" className="trustingCompaniesLogo"/>
//                 <img src={companylogo10} alt="logo" className="trustingCompaniesLogo"/>
//             </div>
//         </div>
//         <div className="aboutContent">
//             <div className="aboutContentLeft">
//                 <img src={stackoverflowimg} alt="stackoveflow" className="aboutContentLeftImg"/>
//                 <div className="aboutContentDesc">
//                 We’re integrating GenAI into our public platform, Stack Overflow for Teams, and brand new product areas, like an IDE integration that brings knowledge from our community right into the area where developers find focus and get work done.
//                 </div>
//                 <div className="aboutContentLinks">
//                     <Link to="/" className="aboutContentLinkBtn">
//                         Learn More
//                     </Link>
//                     <Link to="/" className="aboutContentLink">
//                         What we are Working on &gt;
//                     </Link>
//                 </div>
//             </div>
//             <div className="aboutContentRight">
//                 <img src={aboutcontentimg} alt="" className="aboutContentRightImg"/>
//             </div>
//         </div>
//         <div className="aboutContent two">
//             <div className="aboutContentLeft">
//                 <img src={stackoverflow} alt="stackoveflow" className="aboutContentLeftImg"/>
//                 <div className="aboutContentDesc">
//                 We’re best known for our public Q&A platform that over 100 million people visit every month to ask questions, learn, and share technical knowledge.    
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate at est deserunt non totam iure ab nesciunt illum, necessitatibus rerum natus quasi, dolorum doloribus possimus. Consequatur id pariatur soluta laudantium?                
//                 </div>
//                 <div className="aboutContentLinks">
//                     <Link to="/" className="aboutContentLinkBtn two">
//                         Join community
//                     </Link>
//                 </div>
//             </div>
//             <div className="aboutContentRight">
//                 <img src={aboutimg} alt="" className="aboutContentRightImg"/>
//             </div>
//         </div>
//         <div className="aboutContent three">
//             <div className="aboutContentLeft">
//                 <img src={stackoverflow} alt="stackoveflow" className="aboutContentLeftImg"/>
//                 <div className="aboutContentDesc">
//                 Where developers and technologists share private knowledge with coworkers.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, fugit laudantium. Ex amet, nulla eaque corrupti veniam possimus deleniti deserunt consectetur cumque quidem cupiditate commodi repellendus eius dolor doloribus sint!
//                 </div>
//                 <div className="aboutContentLinks">
//                     <Link to="/" className="aboutContentLinkBtn three">
//                         Learn More
//                     </Link>
//                     <Link to="/" className="aboutContentLink">
//                         Talk to Expert &gt;
//                     </Link>
//                 </div>
//             </div>
//             <div className="aboutContentRight">
//                 <img src={aboutcontentimg} alt="" className="aboutContentRightImg"/>
//             </div>
//         </div>
//         <div className="aboutContent four">
//             <div className="aboutContentLeft">
//                 <img src={stackoverflow} alt="stackoveflow" className="aboutContentLeftImg"/>
//                 <div className="aboutContentDesc">
//                 Reach the world’s largest audience of developers and technologists.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam modi nihil numquam magnam, veritatis accusantium quia aperiam tempore minima quas sapiente rem praesentium nulla possimus voluptas, a quaerat. Alias.
//                 </div>
//                 <div className="aboutContentLinks">
//                     <Link to="/" className="aboutContentLinkBtn four">
//                         Explore Solutions
//                     </Link>
//                 </div>
//             </div>
//             <div className="aboutContentRight">
//                 <img src={aboutcontentimg} alt="" className="aboutContentRightImg"/>
//             </div>
//         </div>
//         <div className="aboutLinksBox">
//             <div className="aboutLink">
//                 <i className='bx bxl-graphql' ></i>
//                 <div className="aboutLinkTitle">
//                     Check out our FAQ about how Stack Overflow works.
//                 </div>
//                 <Link to="/" className="aboutLinkBtn">
//                     Visit the Help Center
//                 </Link>
//             </div>
//             <div className="aboutLink">
//                 <i className='bx bx-chat'></i>
//                 <div className="aboutLinkTitle">
//                 To share feedback about our platform, please visit our meta community.
//                 </div>
//                 <Link to="/" className="aboutLinkBtn">
//                     Visit Meta
//                 </Link>
//             </div>
//             <div className="aboutLink">
//                 <i className='bx bx-user'></i>
//                 <div className="aboutLinkTitle">
//                 Looking for help with Stack Overflow for Teams?
//                 </div>
//                 <Link to="/" className="aboutLinkBtn">
//                     Visit Teams Help Center
//                 </Link>
//             </div>
//             <div className="aboutLink">
//                 <i className='bx bx-file'></i>
//                 <div className="aboutLinkTitle">
//                 Find legal documents for our products and services.
//                 </div>
//                 <Link to="/" className="aboutLinkBtn">
//                     Visit Legal
//                 </Link>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default About

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
