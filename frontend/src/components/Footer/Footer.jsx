import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
          FlavouredWheels delivers delicious food right to your door. Choose from fresh salads, savory rolls, indulgent desserts, hearty sandwiches, pure veg pasta, and flavorful noodles. Order online easily and enjoy fast delivery. Savor every bite with FlavouredWheels.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 4445556667</li>
            <li>sahariarmondal445@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr/>
      <p className="footer-copy-right">
      © FlavouredWheels. All rights reserved. All content and images on this site are the property of FlavouredWheels. Unauthorized use is prohibited.


      </p>
    </div>
  );
};

export default Footer;
