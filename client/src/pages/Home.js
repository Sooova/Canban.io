import React from "react";
import styled from 'styled-components';
import { color, shape } from '../styles';
import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import logo from '../assets/images/canban transparent.png'
import Grid from '@mui/material/Grid';
import githubScreenshot from '../assets/images/github commit.png';
import rocketImage from '../assets/images/Rocket-PNG-Image.png';
import githubLogo from '../assets/images/GitHub-logo.png';
import canbanio from '../assets/images/canbanio.png';
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: 'rgb(31, 28, 46)',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const StyledLandingHeader = styled.h1`
    font-family: "DM Sans", sans-serif;
    font-size: 75px;
    color: rgb(31, 28, 46);
    font-weight: 700;
    opacity: 0.9;
    margin-bottom:2%;
    @media (max-width: 921px) {
      font-size:65px
    }
    @media (max-width: 745px) {
      font-size:55px
    }
`;

const StyledLandingSubHeading = styled.h2`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.8;
font-size: 45px;
text-align:center;
margin-top:20%;
`;

const StyledLandingAbout = styled.p`
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

const StyledDivAbout = styled.div`
margin-top: 5%;
margin-left: auto;
max-width:40%;
`;

const StyledCanbanImg = styled.img`
width:150px;
@media (max-width: 745px) {
  width:100px;
}

@media (max-width: 425px) {
  width:125px;
}
`;

const StyledInfoCardImage = styled.img `
  width: ${props => props.imageWidth}px;
  border-radius:30px;
  display:block;
  margin: auto;
  @media (max-width 1500px) {
    width: ${props => props.imageWidth*0.6}px
  }
`;

const StyledBottomInfoDiv = styled.div`
  color: #111827;
  width:100%;
  height:20%;
`;

const StyledInfoCard = styled.div`
  border-radius: 30px;
  padding: 16px;
  background-color: ${props => props.color};
  min-height: 250px
`;

const StyledInfoCardText = styled.p`
font-family: "DM Sans", sans-serif;
font-size: ${props => props.fontSize}px;
font-weight: ${props => props.fontWeight};
color: rgb(31, 28, 46);
text-align: center;
padding:4%;
margin-left:20px;
margin-right:20px;
line-height:150%;
`;

const StyledCanbanio = styled.img `
  width:500px;
  display:block;
  visibility:hidden;
  margin-left:auto;
  margin-right:auto;
`;

const StyledDiagonalDiv = styled.div `
  position:absolute;
  z-index: -10;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 1500px solid #f6EAEA;
  border-left: 1500px solid transparent;
`;

const StyledButton = styled.button `
  background-color: #FF889D;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid #FF5371;
  cursor: pointer;
  color: white;
  width:300px;
  display:block;
  margin-left: auto;
  margin-right:25%;
  margin-top:5%;
`;

const LandingInfoCardImage = props => <StyledInfoCardImage/>
const LandingHeader = props => <StyledLandingHeader />
const LandingAbout = props => <StyledLandingAbout />
const LandingDivAbout = props => <StyledDivAbout />
const LandingCanbanLogo = props => <StyledCanbanImg />
const LandingBottomInfoDiv = props => <StyledBottomInfoDiv />
const LandingBottomInfoCard = props => <StyledInfoCard />
const LandingInfoCardText = props => <StyledInfoCardText />
const LandingSubHeading = props => <StyledLandingSubHeading />

export {
  LandingHeader,
  LandingAbout,
  LandingDivAbout,
  LandingCanbanLogo,
  LandingBottomInfoDiv,
  LandingBottomInfoCard,
  LandingInfoCardText,
  LandingSubHeading,
  LandingInfoCardImage
}

const Home = () => {
  return (
    <div>
      <StyledDiagonalDiv>
      </StyledDiagonalDiv>
      <StyledCanbanio src = {canbanio}/>
      <Grid
        sx={{
          mt: "5%"
        }}
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item xs={4} sm={3} lg={2} >
          <StyledCanbanImg src={logo} />
        </Grid>
        <Grid item xs={7} sm={6} lg={5}>
          <StyledLandingHeader>
            Meet Canban.io
          </StyledLandingHeader>
          <StyledLandingAbout>
            your can-do buddy to help organize your projects better, keep your commit history in check, and git-organized!
          </StyledLandingAbout>

        </Grid>
        </Grid>
        <Grid container>
          <StyledButton>
            Learn more!
          </StyledButton>


        <Grid container
          spacing={2}
          justifyContent="space-evenly"
        >
          <Grid item lg={12}>
            <StyledLandingSubHeading>
              Git-Organized in 3 easy steps!
            </StyledLandingSubHeading>
          </Grid>

          
          <Grid item lg={3.5}>
            <StyledInfoCard color={"#fee4cb"}>
              <StyledInfoCardText fontSize = {"25"} fontWeight = {700}>
                Link your Github
              </StyledInfoCardText>
              <StyledInfoCardImage src = {githubLogo} imageWidth = {"200"}/>
              <StyledInfoCardText fontSize = {"20"}>
                Link your github account to Canban.io on your profile page
              </StyledInfoCardText>

            </StyledInfoCard>
          </Grid>

          <Grid item lg={3.5}>
            <StyledInfoCard color={"#dbf6fd"}>
              <StyledInfoCardText fontSize = {"25"} fontWeight = {700}>
                Include syntax in your commit message
              </StyledInfoCardText>
              <StyledInfoCardImage src = {githubScreenshot} imageWidth = {"400"}/>
              <StyledInfoCardText fontSize = {"20"}>
                Read our documentation for our intuitive card creation syntax
              </StyledInfoCardText>
            </StyledInfoCard>
          </Grid>

          <Grid item lg={3.5}>
            <StyledInfoCard color={"#c8f7dc"} >
              <StyledInfoCardText fontSize = {"25"} fontWeight = {700}>
                Reap the benefits!
              </StyledInfoCardText>

              <StyledInfoCardImage src = {rocketImage} imageWidth = {"125"}/>
              
              <StyledInfoCardText fontSize = {"20"}>
                Watch as your project dashboard auto-magically fills up, and your commit frequency skyrocket!
              </StyledInfoCardText>

            </StyledInfoCard>
          </Grid>
        </Grid>
      </Grid>
    </div>

  );
};

export default Home;
