import { React, useState } from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import DvrIcon from '@mui/icons-material/Dvr';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import logo from '../assets/images/canban transparent.png'
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import CanbanContainer from "./CanbanContainer";
import { QUERY_USER } from "../gql/queries";
import { useQuery } from "@apollo/client";

const StyledMobileBarContainer = styled.div`
    height: 60px;
    width:100vw;
    position: fixed;
    bottom:0;
    left:0;
    background-color: #FFC4C4;
    display:none;
    @media (max-width: 500px) {
        display:flex;
        justify-content: center;
        align-items: center;
    }
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding-bottom:10px;
    z-index:10;

`;

const StyledMobileUL = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledMobileLi = styled.li`
opacity:0.6;
padding:20px;
transform: scale(1.3);

`;

const MobileBar = function () {

    return (
        <StyledMobileBarContainer>
            <StyledMobileUL>
                <StyledMobileLi>
                    <HomeOutlinedIcon fontSize="large">
                    </HomeOutlinedIcon>
                </StyledMobileLi>
                <StyledMobileLi>
                    <Link to="/dashboard" style={{
                        textDecoration: "none",
                        color: "rgb(31, 28, 46)"
                    }}>
                        <DvrIcon fontSize="large" />
                    </Link>
                </StyledMobileLi>
                <StyledMobileLi>
                    <PersonOutlineIcon fontSize="large" />
                </StyledMobileLi>

                <StyledMobileLi>
                    <SettingsOutlinedIcon fontSize="large" />
                </StyledMobileLi>
            </StyledMobileUL>

        </StyledMobileBarContainer>
    )
}

export default MobileBar