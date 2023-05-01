import React from "react";
import "./styles/footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer>
        <div className="column">
          <h2>About Us</h2>
          <p>
            Final year project: using machine learning to predict brain MRI progression. Developing a web app for early diagnosis of brain diseases. Excited to share our progress with the scientific community and make a meaningful contribution to healthcare.
          </p>
        </div>
        <div className="column">
          <h2>Related Work</h2>
          <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Research Paper</a></li>
            <li><a href="#">Other Work</a></li>
          </ul>
        </div>
        <div className="column">
          <h2>Team Members</h2>
          <div className="sub_column">
            <div>
              <ul>
                <li><a href="#">Archana Uscaicar</a></li>
                <li><a href="#">K L Rithika</a></li>
                <li><a href="#">Artha Naik Dessai</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li><a href="#">Rishi Belani</a></li>
                <li><a href="#">Sashreek Dhaimodkar</a></li>
                <li><a href="#">Aayush Anand</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;