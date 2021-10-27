import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';


const StyledContainer = styled.div `
    width: 15vw;
    height:100%;
    border-left: 2px solid #f6EAEA;
    position:fixed;
    right:0;
`;

const StyledRightH1 = styled.h1`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-weight: ;
opacity: 0.6;
font-size: 25px;
margin-top:10%;
margin-bottom:10%;
line-height:150%;
padding:30px;

@media (max-width: 731px) {
    font-size:20px
}

@media (max-width: 660px) {
    display:none;
}
`;

const RightSidebar = () => {
    return(
        <div>
            <StyledContainer>
                <StyledRightH1>
                    Recent Activity
                </StyledRightH1>
            </StyledContainer>
        </div>
    )
}

export default RightSidebar;