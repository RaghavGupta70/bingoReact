import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiSocketDotIo } from "react-icons/si";
import expr from '../../assets/images/expressjs-icon.svg';
import './styles.css';

const FooterPage = () => {
  return (
    <MDBFooter
      color="unique-color-dark"
      className="page-footer font-small pt-0"
    >
      <div style={{ backgroundColor: "#6351ce" }}>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow className="py-4 d-flex align-items-center">
            <MDBCol
              md="6"
              lg="5"
              className="text-center text-md-left mb-4 mb-md-0"
            >
              <h6 className="mb-0 white-text">
                Get connected with us on social networks!
              </h6>
            </MDBCol>
            <MDBCol md="6" lg="7" className="text-center text-md-right">
              <a className="fb-ic ml-0">
                <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
              </a>
              <a className="tw-ic">
                <i className="fab fa-twitter white-text mr-lg-4"> </i>
              </a>
              <a className="gplus-ic">
                <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
              </a>
              <a className="li-ic">
                <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
              </a>
              <a className="ins-ic">
                <i className="fab fa-instagram white-text mr-lg-4"> </i>
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <MDBContainer className="mt-5 mb-4 text-center text-md-left">
        <MDBRow className="mt-3">
          <MDBCol md="3" lg="4" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Binod Bingo</strong>
            </h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              Come play bingo and feel high af.A experience to be remembered
              forever.Play with friends and get fucked.Happy Playing:)
            </p>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Tech Used</strong>
            </h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <a href="https://reactjs.org/">
                <FaReact
                  style={{ color: "rgb(0,229,255)", marginRight: "3%" }}
                />
                React JS
              </a>
            </p>
            <p>
              <a href="https://expressjs.com/">
                <img src={expr} style={{marginRight: '3%',width: '10%' }} />
                Express JS
              </a>
            </p>
            <p>
              <a href="https://nodejs.org/en/">
                <FaNodeJs
                  style={{ color: "rgb(139,195,74)", marginRight: "3%" }}
                />
                Node JS
              </a>
            </p>
            <p>
              <a href="https://www.mongodb.com/">
                <SiMongodb
                  style={{ color: "rgb(76,175,80)", marginRight: "3%" }}
                />
                Mongo DB
              </a>
            </p>
            <p>
              <a href="https://socket.io/">
                <SiSocketDotIo style={{ color: "white", marginRight: "3%" }} />
                Socket.io
              </a>
            </p>
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>More Info</strong>
            </h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <a href="/profile">Your Profile</a>
            </p>
            <p>
              <a href="#!">Privacy Policy</a>
            </p>
            <p>
              <a href="#!">About Us</a>
            </p>
            <p>
              <a href="#!">Help</a>
            </p>
          </MDBCol>
          <MDBCol md="4" lg="3" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong>Contact</strong>
            </h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <i className="fa fa-home mr-3" /> Red Light Area,UIET,Chd
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> sukhanDeo@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> + 91 98784-77625
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="/home"> Binod Bingo </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
