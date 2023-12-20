import "./Home.css"
import logoimg from '../../assets/Stack_Overflow.png';

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <img src={logoimg} alt="Stack Overflow Clone" className="homeImg"/>
      </div>
    </div>
  )
}

export default Home