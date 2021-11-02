import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import moment from "moment";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IconButton } from "@mui/material";
import { borderRadius, maxWidth } from "@mui/system";

const StyledContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content:space-between;
`;

const StyledRightH1 = styled.h1`
font-family: "DM Sans", sans-serif;
font-size: 20px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.7;
margin-bottom:2%;
`;

const StyledRightP = styled.p`
font-family: "DM Sans", sans-serif;
font-size:15px;
color: rgb(31, 28, 46);
font-weight: 600;
opacity:0.7
`;

const RightSidebar = (props) => {
    console.log(props);
    const StyledRightContainer = styled.div`
padding: 40px;
max-width: 300px;
background-color: white;
border-radius: 30px;
display: flex;
justify-content: left;
flex-direction: column;
margin-right: 50px;
@media (max-width: ${props.width}px) {
    display:none;
}

`;
    return (
        <StyledRightContainer>
            <StyledRightH1>
                {moment().format("dddd, Do MMMM")}
            </StyledRightH1>
            <StyledContainer>
                <StyledRightP>
                    What i plan to do today
                </StyledRightP>
                <IconButton>
                    <AddCircleOutlineOutlinedIcon
                        fontSize="large" />
                </IconButton>

            </StyledContainer>
            <div style={{
                marginTop: "200px"
            }}>
                <StyledRightP>
                    Recent Actions
                </StyledRightP>
                <StyledRightP style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    paddingTop: "5px"
                }}>
                    You have no recent actions.
                </StyledRightP>
            </div>
        </StyledRightContainer>
    )
}

export default RightSidebar;