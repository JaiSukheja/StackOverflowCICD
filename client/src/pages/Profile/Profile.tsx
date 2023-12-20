import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
import apiContext from "../../context/apiContext";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState({} as any);
  const [points, setPoints] = useState(0);
  const { apiUrl }: any = useContext(apiContext);
  const { t } = useTranslation();
  let reputation = "";
  let Gold = 0;
  let Silver = 0;
  let Bronze = 0;
  let points1 = points;
  if (points1 >= 1000) {
    Gold = Math.floor(points1 / 1000);
    points1 = points % 1000;
  }
  if (points1 >= 500) {
    Silver = Math.floor(points1 / 100);
    points1 = points % 500;
  }
  if (points1 >= 100) {
    Bronze = Math.floor(points1 / 10);
    points1 = points1 % 100;
  }
  let badge = 0;
  if (points >= 1000) {
    badge = 5;
    reputation = "master";
  } else if (points >= 500) {
    badge = 4;
    reputation = "expert";
  } else if (points >= 250) {
    badge = 3;
    reputation = "advanced";
  } else if (points >= 100) {
    badge = 2;
    reputation = "intermediate";
  } else if (points >= 50) {
    badge = 1;
    reputation = "beginner";
  } else {
    badge = 0;
    reputation = "newbie";
  }

  useEffect(() => {
    axios
      .get(apiUrl + "/user/" + userId)
      .then((res: any) => {
        setUserData(res.data);
        setPoints(
          res.data?.points.questionsPoints * 10 +
            res.data?.points.answersPoints * 5 +
            res.data?.points.questionUpvotesPoints * 2 +
            res.data?.points.questionDownvotesPoints +
            res.data?.points.acceptedanswersPoints * 15 +
            res.data?.points.answerUpvotesPoints * 5 +
            res.data?.points.answerDownvotesPoints * 2
        );
        // console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [userId]);
  const renderInfoBlock = (label:any, value:any) => (
    <div className="infoBlock">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  );

  return (
    
    <div className="profile">
      <Sidebar activeLink={"users"} />
      <div className="profileContainer">
        <div className="profileBox">
          <div className="profileHeader">
            <div className="profileImage">
              <img src={userData?.profilePicture} alt="Profile Picture" />
            </div>
            <div className="profileInfo">
              <div className="profileName">{userData?.username}</div>
              <div className="profileEmail">Email: {userData?.email}</div>
              <div className="profileDateodJoining">
                {t("profile.memberFor")}{" "}
                {new Date(userData?.createdAt).toLocaleDateString()}
              </div>
              <div className="profileLastSeen">
                {t("profile.lastActivity")}{" "}
                {new Date(userData?.updatedAt).toLocaleDateString()}
              </div>
              <div className="profileLocation">
                {t("profile.location")}: India
              </div>
              <div className="profileReputaion">
                {t("profile.reputation")}: {t(`profile.badgeNames.${reputation}`)}
              </div>
              <Link className="editProfileBtn" to={"/editProfile"}>
                {t("profile.editProfile")}
              </Link>
            </div>
            <div className="profileBioBox">
            <div className="profileMedalsHeader">Login Information</div>

                <div className="browserInfo">
                  
                  {renderInfoBlock("Browser", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].browser.name : '')}
                  {renderInfoBlock("Version", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].browser.version : '')}
                </div>

                <div className="osInfo">
                  
                  {renderInfoBlock("OS", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].os.name : '')}
                  {renderInfoBlock("Version", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].os.version : '')}
                </div>

                <div className="engineInfo">
                 
                  {renderInfoBlock("Engine", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].engine.name : '')}
                  {renderInfoBlock("Version", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].engine.version : '')}
                </div>

                {/* {userData?.loginHistory[userData?.loginHistory.length - 1].device.name && <div className="deviceInfo">
                  {renderInfoBlock("Device", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].device.name : '')}
                  {renderInfoBlock("Version", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].device.version : '')}
                </div>} */}
                <div className="ipInfo">
                  {renderInfoBlock("IP Address", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].ipAddress : '')}
                </div>

                <div className="cpuInfo">
                  {renderInfoBlock("CPU Architecture", userData?.loginHistory ? userData?.loginHistory[userData?.loginHistory.length - 1].cpu.architecture : '')}
                </div>   
                <div className="loginTimeInfo"  >
                  {renderInfoBlock("Login Date", userData?.loginHistory ? new Date(userData?.loginHistory[userData?.loginHistory.length - 1].loginTime).toLocaleDateString() : '')}
                  {renderInfoBlock("Login Time", userData?.loginHistory ? new Date(userData?.loginHistory[userData?.loginHistory.length - 1].loginTime).toLocaleTimeString() : '')}
                </div>             
            </div>
          </div>
          <div className="profileBody">
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">
                {t("profile.questions")}
              </div>
              <div className="profileBodyBoxContent">
                {userData.questions ? userData?.questions.length : 0}
              </div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">{t("profile.answers")}</div>
              <div className="profileBodyBoxContent">
                {userData.answers ? userData?.answers.length : 0}
              </div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">{t("profile.points")}</div>
              <div className="profileBodyBoxContent">{points}</div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">{t("profile.badges")}</div>
              <div className="profileBodyBoxContent">{badge}</div>
            </div>
            <div className="profileMedals">
                <div className="profileMedalsHeader">{t("profile.medals")}</div>
                <div className="profileMedalsContent">
                  <div className="goldMedal">
                    <i className="bx bxs-medal"></i>
                    <div className="medalCount">{Gold} Gold</div>
                  </div>
                  <div className="silverMedal">
                    <i className="bx bxs-medal"></i>
                    <div className="medalCount">{Silver} Silver</div>
                  </div>
                  <div className="bronzeMedal">
                    <i className="bx bxs-medal"></i>
                    <div className="medalCount">{Bronze} Bronze</div>
                  </div>
                </div>
              </div>
          <div className="profileBadges">
            <div className="profileBadgesHeader">{t("profile.badges")}</div>
            <div className="profileBadgesContent">
              {badge >= 1 ? (
                <i className="bx bxs-star active1"></i>
              ) : (
                <i className="bx bxs-star"></i>
              )}
              {badge >= 1 ? (
                <hr className="badgeHr activehr1" />
              ) : (
                <hr className="badgeHr" />
              )}
              {badge >= 2 ? (
                <i className="bx bxs-shield active2"></i>
              ) : (
                <i className="bx bxs-shield"></i>
              )}
              {badge >= 2 ? (
                <hr className="badgeHr activehr2" />
              ) : (
                <hr className="badgeHr" />
              )}
              {badge >= 3 ? (
                <i className="bx bxs-trophy active3"></i>
              ) : (
                <i className="bx bxs-trophy"></i>
              )}
              {badge >= 3 ? (
                <hr className="badgeHr activehr3" />
              ) : (
                <hr className="badgeHr" />
              )}
              {badge >= 4 ? (
                <i className="bx bx-shield-alt  active4"></i>
              ) : (
                <i className="bx bx-shield-alt"></i>
              )}
              {badge >= 4 ? (
                <hr className="badgeHr activehr4" />
              ) : (
                <hr className="badgeHr" />
              )}
              {badge >= 5 ? (
                <i className="bx bxs-hot active5"></i>
              ) : (
                <i className="bx bxs-hot"></i>
              )}
              {badge >= 5 ? (
                <hr className="badgeHr activehr5" />
              ) : (
                <hr className="badgeHr" />
              )}
              {badge >= 6 ? (
                <i className="bx bx-health active6"></i>
              ) : (
                <i className="bx bx-health"></i>
              )}
            </div>
            <div className="profileBadgesContent">
              <div className="profileBadgesName">
                {t("profile.badgeNames.newbie")}
              </div>
              <div className="profileBadgesName">
                {t("profile.badgeNames.beginner")}
              </div>
              <div className="profileBadgesName">
                {t("profile.badgeNames.intermediate")}
              </div>
              <div className="profileBadgesName">
                {t("profile.badgeNames.advanced")}
              </div>
              <div className="profileBadgesName">
                {t("profile.badgeNames.expert")}
              </div>
              <div className="profileBadgesName">
                {t("profile.badgeNames.master")}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
