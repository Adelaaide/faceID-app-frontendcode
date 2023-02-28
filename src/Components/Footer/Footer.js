import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>DANIEL A. GREY</h4>
            <h1 className="list-unstyled">
              <li>+234-814-482-1803</li>
              <li>Lagos, Nigeria</li>
              <li>Freedom Way, LB</li>
            </h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} GREY DESIGNS | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;