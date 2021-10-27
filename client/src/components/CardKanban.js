import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';


const StyledInfoCardContainer = styled.div`
  border-radius: 30px;
  padding: 16px;
  border-left: solid 7px #c8f7dc;
  min-height: 100px;
  background-color:white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
  display:inline-flex;
  position:relative;
  margin-left:300px;
  justify-content: center;
  align-items: center;
  min-width:200px;
`;

const StyledCardTitle = styled.h2 `
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 16px;
line-height: 24px;
font-weight: 700;
opacity: 0.7;
text-align:center;

`;

const StyledCardP = styled.p `
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
`;

const  StyledCardDate = styled.h3 `
font-family: "DM Sans", sans-serif;
color: #4A4A4A;
opacity: 0.5;
font-size: 14px;
line-height: 16px;
position:absolute;
top:7%;
left:20px;
`;

const StyledTagContainer = styled.div `
border-radius: 30px;
background-color: #c8f7dc; 
display: inline-block;
position:absolute;
right:20px;
bottom:7%;
`;

const StyledTagName = styled.p `
color: #408f62;
font-family: "DM Sans", sans-serif;
font-size:10px;
padding:4px;
`;


function CardKanban() {
    
    
    
    return (
        <div>
            <StyledInfoCardContainer>
                <StyledCardDate>
                    september 7th, 2021
                </StyledCardDate>
                <StyledCardTitle>
                    Fix login handler.
                </StyledCardTitle>
                
                <StyledTagContainer>
                    <StyledTagName>
                        Complete
                    </StyledTagName>
                </StyledTagContainer>
            </StyledInfoCardContainer>
        </div>
    )
}

export default CardKanban;