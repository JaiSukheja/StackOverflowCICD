import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
import apiContext from "../../context/apiContext";

const Profile = () => {
  const {id : userId} = useParams();
  const [userData, setUserData] = useState({} as any);
  const [points, setPoints] = useState(0);
  const {apiUrl}:any = useContext(apiContext)
  let Gold =0;
  let Silver =0;
  let Bronze =0;
  let points1 = points;
  if(points1>=1000){
    Gold = Math.floor(points1/1000);
    points1 = points%1000;
  }
  if(points1>=500){
    Silver = Math.floor(points1/100);
    points1 = points%500;
  }
  if(points1>=100){
    Bronze = Math.floor(points1/10);
    points1 = points1%100;
  }
  let badge = 0;
  if(points>=1000){
    badge = 5;
  }
  else if(points>=500){
    badge = 4;
  }
  else if(points>=250){
    badge = 3;
  }
  else if(points>=100){
    badge = 2;
  }
  else if(points>=50){
    badge = 1;
  }
  else{
    badge = 0;
  }
  useEffect(() => {
    axios
      .get(apiUrl+"/user/" + userId)
      .then((res: any) => {
        setUserData(res.data);
        setPoints(res.data?.points.questionsPoints*10 + res.data?.points.answersPoints*5 + res.data?.points.questionUpvotesPoints*2 + res.data?.points.questionDownvotesPoints + res.data?.points.acceptedanswersPoints*15 + res.data?.points.answerUpvotesPoints*5 + res.data?.points.answerDownvotesPoints*2);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [userId]);
  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <div className="profileBox">
          <div className="profileHeader">
            <div className="profileImage">
              <img
                src={userData?.profilePicture}
                alt="Profile Picture"
              />
            </div>
            <div className="profileInfo">
              <div className="profileName">{userData?.username}</div>
              <div className="profileEmail">Email: {userData?.email}</div>
              <div className="profileDateodJoining">
                Member for {new Date(userData?.createdAt).toLocaleDateString()}
              </div>
              <div className="profileLastSeen">
                Last Activity{" "}
                {new Date(userData?.updatedAt).toLocaleDateString()}
              </div>
              <div className="profileLocation">Location: India</div>
              <div className="profileReputaion">Reputation: Expert</div>
              <button className="editProfileBtn">Edit Profile</button>
            </div>
            <div className="profileBioBox">
              <div className="profileBio">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati suscipit reprehenderit nam non tempore totam, delectus
                deserunt, excepturi exercitationem sed sequi deleniti pariatur
                ducimus provident rerum, adipisci distinctio magni explicabo
                quisquam? Hic dignissimos reprehenderit laudantium qui eveniet,
                maiores corrupti modi rem delectus doloribus provident, odio
                odit ducimus explicabo molestias itaque? Iusto nesciunt mollitia
                officiis assumenda nisi quisquam nulla nihil, similique
                veritatis voluptatibus provident impedit fugiat neque eaque est
                ratione dolor dicta rerum harum ex, autem labore. Incidunt
                placeat in natus eius maxime beatae ea magni ipsa voluptates
                nulla non nemo at sequi iste, aut laboriosam aspernatur ullam
                dicta tenetur unde!
              </div>
              <div className="profileMedals">
                <div className="profileMedalsHeader">Medals</div>
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
            </div>
          </div>
          <div className="profileBody">
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">Questions</div>
              <div className="profileBodyBoxContent">{userData.questions ? userData?.questions.length : 0}</div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">Answers</div>
              <div className="profileBodyBoxContent">{userData.answers ? userData?.answers.length : 0}</div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">Points</div>
              <div className="profileBodyBoxContent">{
                userData.points ? points : 0
              }</div>
            </div>
            <div className="profileBodyBox">
              <div className="profileBodyBoxHeader">Badges</div>
              <div className="profileBodyBoxContent">{ badge}</div>
            </div>
          </div>
          <div className="profileBadges">
            <div className="profileBadgesHeader">Badges</div>
            <div className="profileBadgesContent">
              { badge>=1 ?
                <i className='bx bxs-star active1' ></i> : <i className='bx bxs-star' ></i>}
              { badge>=1 ? <hr className="badgeHr activehr1"/> : <hr className="badgeHr"/>}
              {
                badge>=2 ?
                <i className='bx bxs-shield active2' ></i>
                : <i className='bx bxs-shield' ></i>
              }
              { badge>=2 ? <hr className="badgeHr activehr2"/> : <hr className="badgeHr"/>}
              {
                badge>=3 ?
                <i className='bx bxs-trophy active3' ></i>
                : <i className='bx bxs-trophy' ></i>
              }
              { badge>=3 ? <hr className="badgeHr activehr3"/> : <hr className="badgeHr"/>}
              {
                badge>=4 ?
                <i className='bx bx-shield-alt  active4' ></i>
                : <i className='bx bx-shield-alt' ></i>
              }
              { badge>=4 ? <hr className="badgeHr activehr4"/> : <hr className="badgeHr"/>}
              {
                badge>=5 ?
                <i className='bx bxs-hot active5' ></i>
                : <i className='bx bxs-hot' ></i>
              }
              { badge>=5 ? <hr className="badgeHr activehr5"/> : <hr className="badgeHr"/>}
              {
                badge>=6 ?
                <i className='bx bx-health active6' ></i>
                : <i className='bx bx-health' ></i>
              }
            </div>
            <div className="profileBadgesContent">
              <div className="profileBadgesName">
                Newbie
              </div>
              <div className="profileBadgesName">
                Beginner
              </div>
              <div className="profileBadgesName">
                Intermediate
              </div>
              <div className="profileBadgesName">
                Advanced
              </div>
              <div className="profileBadgesName">
                Expert
              </div>
              <div className="profileBadgesName">
                Master
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


