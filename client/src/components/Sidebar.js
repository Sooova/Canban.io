import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import DvrIcon from '@mui/icons-material/Dvr';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import logo from '../assets/images/canban transparent.png'
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";

const StyledCanbanio = styled.img `
	width:30px;
	display:inline-block;

    @media (max-width: 660px) {
        width:20px;
        padding-bottom:20px;
    }
`;

const StyledSidebarContainer = styled.div`
    height: 100%;
    width:12%;
    position: fixed;
    background-color: #FCF6F6;
    border-right: 2px solid #f6EAEA;
    padding: 30px;

    @media (max-width: 660px) {
        width:4%;
        padding:20px;
        padding-top:10%;
    }
    top: 0;
`;

const StyledUl = styled.ul`
    list-style-type: none;
`;

const StyledSidebarLi = styled.li`
font-family: "DM Sans", sans-serif;
font-size: 15px;
opacity: 0.7;
color: rgb(31, 28, 46);
margin-bottom: 14px;
font-weight: 600;
display: flex;
align-items: center;
cursor: pointer;
@media (max-width: 660px) {
    justify-content: center;
}
@media (max-width: 731px) {
    font-size:12px
}

&:hover {
    opacity: 1;
}
`;

const StyledP = styled.p`
@media (max-width: 660px) {
    display:none;
}
`;

const StyledSidebarH1 = styled.h1`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.8;
font-size: 25px;
margin-top:10%;
margin-bottom:10%;
line-height:150%;
@media (max-width: 731px) {
    font-size:20px
}

@media (max-width: 660px) {
    display:none;
}
`;

const SidebarP = props => <StyledP />
const SidebarUl = props => <StyledUl />
const SidebarLi = props => <StyledSidebarLi />
const SidebarContainer = props => <StyledSidebarContainer />
const SidebarH1 = props => <StyledSidebarH1 />

function sidebar() {
    return (
        <div>
            <StyledSidebarContainer>
                <Link to="/">
                <StyledCanbanio src = {logo}/>
                </Link>
                <StyledSidebarH1>
                    Hey, Alexandra!
                </StyledSidebarH1>

                <StyledSidebarLi>
                    <HomeOutlinedIcon fontSize="medium"
                        sx={{
                            marginRight: ["10px"]

                        }} />
                    <StyledP>
                        Home
                    </StyledP>
                </StyledSidebarLi>

                <StyledSidebarLi>
                    <DvrIcon fontSize="medium"
                        sx={{
                            marginRight: ["10px"]

                        }}
                    />
                    <StyledP>
                        Workspaces
                    </StyledP>
                </StyledSidebarLi>

                <StyledSidebarLi>
                    <PersonOutlineIcon fontSize="medium"
                        sx={{
                            marginRight: ["10px"]

                        }}
                    />
                    <StyledP>
                        Profile
                    </StyledP>
                </StyledSidebarLi>

                <StyledSidebarLi>
                    <SettingsOutlinedIcon fontSize="medium"
                        sx={{
                            marginRight: ["10px"]

                        }}
                    />
                    <StyledP>
                        Settings
                    </StyledP>
                </StyledSidebarLi>
            </StyledSidebarContainer>
                        
            <RightSidebar>

            </RightSidebar>
        </div>

    )
}

export default sidebar;

//Workspaces, Profile, Settings, 