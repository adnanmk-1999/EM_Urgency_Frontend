import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Logo from "../../../images/logo2.jpeg";

import "./footer.css";

const FooterPage = () => {
  return (
    <div className="footerBackground">
      <MDBFooter color="primary" className="font-small pt-4 mt-4 ">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6" className="copyright">

              <img src={Logo} alt="Logo" width={100}></img>&nbsp;

              &copy; {new Date().getFullYear()}, EM-Urgency, All rights reserved

            </MDBCol>
            <MDBCol md="6" className="socialIcons">

              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="fa fa-facebook"> </a>&nbsp;&nbsp;
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="fa fa-instagram"> </a>&nbsp;&nbsp;
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="fa fa-twitter"> </a>&nbsp;&nbsp;
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="fa fa-linkedin"> </a>&nbsp;&nbsp;
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="fa fa-youtube"> </a>&nbsp;&nbsp;
              <a href="https://in.pinterest.com/" target="_blank" rel="noopener noreferrer" className="fa fa-pinterest"> </a>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBFooter>
    </div>
  );
}

export default FooterPage;