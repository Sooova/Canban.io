import React from "react";
import styled from 'styled-components';
import CanbanConfused from "../assets/images/canban confused shaken.png";
import { LandingAbout } from "./Home";
import { Link } from "react-router-dom";

const StyledCanbanConfused = styled.img`
width:400px;
display:inline-block;
padding-right:40px;
@media (max-width: 745px) {
  width:300px;
}

@media (max-width: 425px) {
  width:225px;
}
`;

const Styled404Header = styled.h1`
font-family: "DM Sans", sans-serif;
font-size: 75px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.9;
margin-bottom:2%;
display:inline-block;
@media (max-width: 921px) {
  font-size:65px
}
@media (max-width: 745px) {
  font-size:45px
}
`;

const Styled404Text = styled.p`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 25px;
max-width:60%;
line-height:150%;
@media (max-width: 921px) {
  font-size:20px
}
@media (max-width: 745px) {
  font-size:15px
}
`;

const StyledErrorDiv = styled.div`
    Display:flex;
    justify-content: center;
    flex-direction: row;
    align-items:center;
    margin-top:5%;
    @media (max-width: 745px) {
        margin-top: 25%;
      }
`;



const ErrorCanbanConfused = props => <StyledCanbanConfused />
const Error404Header = props => <Styled404Header />
const ErrorDiv = props => <StyledErrorDiv />
const ErrorPageText = props => <Styled404Text />

export {
  ErrorCanbanConfused,
  Error404Header,
  ErrorDiv,
  ErrorPageText
}

const ErrorPage = () => {
  document.body.style = "background-image: none; background-color: white ";
  return (
    <div>
      <StyledErrorDiv>
        <StyledCanbanConfused src={CanbanConfused} />
        <div>
          <Styled404Header>
            404 Error
          </Styled404Header>
          <Styled404Text>
            This page has Ban all shaken up.
          </Styled404Text>

          <Link to="/" style = {{
            textDecoration: "none"
          }}>
            <Styled404Text style = {{
              paddingTop: "20px",
              textDecoration: "none", 
            }}>
              <span style = {{
                fontSize: "30px"
              }}>🠐</span> Back to Saftey
            </Styled404Text>
          </Link>
        </div>
      </StyledErrorDiv>
    </div>
  )
}

export default ErrorPage;