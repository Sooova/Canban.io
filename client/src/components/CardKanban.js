import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { FETCH_CARDS } from "../gql/queries";
import { DELETE_CARD } from "../gql/mutations";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from "@mui/material";
import { useMutation } from "@apollo/client";
import { keyframes } from "styled-components";
import githubAutoImportIcon from "../assets/images/autoimport icon.png"

const StyledDeleteContainer = styled.div`
    display:none;
    opacity:50%;
    &:hover {
        opacity:100%
      }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledInfoCardContainer = styled.div`
  border-radius: 22px;
  padding: 16px;
  border-left: solid 7px ${props => props.theme.bg};
  background-color:white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
  display:flex;
  position:relative;
  justify-content: left;
  align-items: center;
  margin:5px;
  width: 80%;
  max-width:250px;
  animation: ${fadeIn} 0.5s linear; 
  animation-fill-mode: forwards;
  &:hover ${StyledDeleteContainer} {
    display: block;
  }
  white-space: normal;
`;

const StyledCardTitle = styled.h2`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 16px;
line-height: 24px;
font-weight: 400;
opacity: 0.7;
text-align:left;
padding-top:10px;
padding-bottom:15px;

`;

const StyledCardP = styled.p`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
`;

const StyledCardDate = styled.h3`
font-family: "DM Sans", sans-serif;
color: #4A4A4A;
opacity: 0.5;
font-size: 12px;
line-height: 16px;
position:absolute;
top:7%;
left:20px;
`;

const StyledTagFlex = styled.div`
    position:absolute;
    right:20px;
    bottom:7%;
    display: flex;
    flex-direction: row;
`;
const StyledTagContainer = styled.div`
border-radius: 30px;
background-color: ${props => props.theme.bg}; 
display: flex;
flex-direction: row;
margin-left: 10px;
align-items: center;
`;

const StyledImportTagContainer = styled.div`
border-radius: 30px;
background-color: #e0e0e0; 
display: flex;
flex-direction: row;
margin-left: 10px;
align-items: center;
`;

const StyledTagName = styled.p`
color: ${props => props.theme.p};
font-family: "DM Sans", sans-serif;
font-size:10px;
padding:5px;
`;

const StyledImportTagName = styled.p`
color: #666666;
font-family: "DM Sans", sans-serif;
font-size:10px;
padding:5px;
`;

const StyledImportIcon = styled.img`
    width:14px;
    height:14px;
    opacity:80%;
    padding-left:5px;

`;

function CardKanban({ id, state, title, updatedAt, callback, cardColor, autoImport }) {
    const themeState = {
        complete: {
            bg: "#c8f7dc",
            p: "#408f62"
        },
        inProgress: {
            bg: "#fee4cb",
            p: "#b8926e"
        },
        toDo: {
            bg: "#dbf6fd",
            p: "#6fa1ad"
        }
    }

    const themeColor = {
        pink: {
            bg: "#FFE6E3",
        },
        purple: {
            bg: "#A0A0FA",
        },
        green: {
            bg: "#D0FCDB",
        },
        lightBlue: {
            bg: "#CEDDFF"
        }
    }


    const [deleteCard] = useMutation(DELETE_CARD);

    const handleCardDelete = async (err) => {
        try {
            console.log(id);
            const mutationResponse = await deleteCard({
                variables: {
                    id: id
                }
            });

            callback();
        }
        catch (err) {
            console.log(err)
        }
    }



    return (
        <ThemeProvider theme={themeColor[cardColor] ? themeColor[cardColor] : themeColor['pink']}>
            <StyledInfoCardContainer>
                <StyledDeleteContainer>
                    <IconButton onClick={handleCardDelete}
                        sx={{
                            position: "absolute",
                            top: "2%",
                            right: "12px",
                        }}
                    >
                        <HighlightOffIcon
                            fontSize="large"
                        />
                    </IconButton>
                </StyledDeleteContainer>
                <StyledCardDate>
                    {/* <Moment unix format="YYYY/MM/DD">{cardData.updatedAt}</Moment> */}
                    {moment(updatedAt).format("MMM Do")}
                </StyledCardDate>
                <StyledCardTitle>
                    {title}
                </StyledCardTitle>
                <ThemeProvider theme={themeState[state]}>
                    <StyledTagFlex>
                        <StyledTagContainer>
                            <StyledTagName>
                                {state}
                            </StyledTagName>
                        </StyledTagContainer>
                        {autoImport == true ?
                            <StyledImportTagContainer>
                                <StyledImportIcon src={githubAutoImportIcon} />
                                <StyledImportTagName>
                                    {'imported'}
                                </StyledImportTagName>
                            </StyledImportTagContainer>
                            :
                            ''        
                }

                    </StyledTagFlex>
                </ThemeProvider>

            </StyledInfoCardContainer>
        </ThemeProvider>
    )
}

export default CardKanban;
