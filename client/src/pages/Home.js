import React from "react";
import styled from 'styled-components';
import { color, shape } from '../styles';
import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import logo from '../assets/images/canbanlogo.png' 

const StyledLandingHeader = styled.h1`
    font-family: "DM Sans", sans-serif;
    font-size: 70px;
    color: rgb(31, 28, 46);
    font-weight: 700;
    opacity: 0.9;
`;

const StyledLandingAbout = styled.p`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 20px;
max-width:50%;
`;

const StyledDivAbout = styled.div`
margin-top: 5%;
margin-left: auto;
max-width:40%;
`;

const StyledCanbanImg = styled.img `
width:100px;
`;

const StyledBottomInfoDiv = styled.div `
  color: #111827;
  width:100%;
  height:20%;
`;

const LandingHeader = props => <StyledLandingHeader />
const LandingAbout = props => <StyledLandingAbout />
const LandingDivAbout = props => <StyledDivAbout/>
const LandingCanbanLogo = props => <StyledCanbanImg/>
const LandingBottomInfoDiv = props => <StyledBottomInfoDiv/>
export {
  LandingHeader,
  LandingAbout,
  LandingDivAbout,
  LandingCanbanLogo,
  LandingBottomInfoDiv
}

const Home = () => {
  return (
    <div>

      <StyledDivAbout>
        <StyledCanbanImg src = {logo}/>
        <div>
        <StyledLandingHeader>
          Meet Ban
        </StyledLandingHeader>
        <StyledLandingAbout>
        your can-do buddy to help organize your projects better,keep your commit history in check, and git-organized
        </StyledLandingAbout>
        </div>
      </StyledDivAbout>
      <LandingBottomInfoDiv>
        <h3>
          test
        </h3>
      </LandingBottomInfoDiv>
    </div>

  );
};

export default Home;
