import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import Moment from 'react-moment';



const StyledInfoCardContainer = styled.div`
  border-radius: 30px;
  padding: 16px;
  border-left: solid 7px ${props => props.theme.bg};
  min-height: 100px;
  background-color:white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
  display:inline-flex;
  position:relative;
  justify-content: center;
  align-items: center;
  margin:5px;
  max-width:200px;
`;

const StyledCardTitle = styled.h2`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 16px;
line-height: 24px;
font-weight: 700;
opacity: 0.7;
text-align:center;

`;

const StyledCardP = styled.p`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
`;

const StyledCardDate = styled.h3`
font-family: "DM Sans", sans-serif;
color: #4A4A4A;
opacity: 0.5;
font-size: 14px;
line-height: 16px;
position:absolute;
top:7%;
left:20px;
`;

const StyledTagContainer = styled.div`
border-radius: 30px;
background-color: ${props => props.theme.bg}; 
display: inline-block;
position:absolute;
right:20px;
bottom:7%;
`;

const StyledTagName = styled.p`
color: ${props => props.theme.p};
font-family: "DM Sans", sans-serif;
font-size:10px;
padding:5px;
`;


function CardKanban() {
    const data = [
        {
            "id": 234234,
            "title": "fix login Handler",
            "state": "toDo",
            "workspaceID": 1234,
            "updatedAt": "1635218108067"
        },
        {
            "id": 234245634,
            "title": "wake cutter up",
            "state": "inProgress",
            "workspaceID": 69420,
            "updatedAt": "1635218808212"
        },
        {
            "id": 234223423434,
            "title": "turn cutter straight",
            "state": "toDo",
            "workspaceID": 69420,
            "updatedAt": "1635218808212"
        },
        {
            "id": 2344574512234,
            "title": "make cutter love me",
            "state": "complete",
            "workspaceID": 69420,
            "updatedAt": "1635218808212"
        }
    ]

    const themeState = [
        {
            bg: "#c8f7dc",
            p: "#408f62"
        },
        {
            bg: "#fee4cb",
            p: "#b8926e"
        },
        {
            bg: "#dbf6fd",
            p: "#6fa1ad"
        }
    ]


    return (
        <div>
            {data.map((cardData) => {
                let themeStateIndex;
                if (cardData.state === "complete") {
                    themeStateIndex = 0
                }
                else if (cardData.state === "inProgress") {
                    themeStateIndex = 1
                }
                else if (cardData.state === "toDo") {
                    themeStateIndex = 2
                }
                return (
                    <div key = {cardData.id} >
                        <ThemeProvider theme={themeState[themeStateIndex]}>
                            <StyledInfoCardContainer>
                                <StyledCardDate>
                                    {cardData.updatedAt}
                                </StyledCardDate>
                                <StyledCardTitle>
                                    {cardData.title}
                                </StyledCardTitle>

                                <StyledTagContainer>
                                    <StyledTagName>
                                        {cardData.state}
                                    </StyledTagName>
                                </StyledTagContainer>
                            </StyledInfoCardContainer>
                        </ThemeProvider>
                    </div>
                )
            })}
        </div>
    )
}

export default CardKanban;

