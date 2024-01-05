import "./InfoBar.css";
import closeIcon from "../../assets/icons/closeIcon.png";
import onlineIcon from "../../assets/icons/onlineIcon.png";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} alt="Online" className="onlineIcon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close image" />
      </a>
    </div>
  </div>
);

export default InfoBar;
