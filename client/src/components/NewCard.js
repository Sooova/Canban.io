import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import moment from "moment";
import CardKanban from "./CardKanban";
import ContentEditable from 'react-contenteditable'
import { useState, useRef } from "react";
import { ADD_CARD } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { IconButton } from "@mui/material";

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
  width:180px;
  transform: scale(1.25);
  margin-top:30px;
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
&:hover {
    opacity:0.7;
    cursor:pointer;
}
`;

const StyledTagName = styled.p`
color: ${props => props.theme.p};
font-family: "DM Sans", sans-serif;
font-size:10px;
padding:5px;
`;




const NewCard = (props) => {
    const cardText = useRef('untitled')
    const cardState = ['toDo', 'inProgress', 'complete']
    const [CardState, setCardState] = useState(cardState[2])
    const [cardStateIndex, setCardStateIndex] = useState(0)
    const handleChange = (e) => {
        cardText.current = e.target.value;
    };

    const handleBlur = () => {
        console.log(cardText.current);
    }

    const handleState = () => {
        setCardStateIndex((cardStateIndex + 1) % 3);
        console.log(cardStateIndex);
        setCardState(cardState[cardStateIndex])
    }

    const [mutateCard] = useMutation(ADD_CARD);

    const handleCardSubmit = async (err) => {
        try {
            const mutationResponse = await mutateCard({
                variables: {
                    title: cardText.current.slice(0,cardText.current.length-4),
                    state: CardState,
                    workspaceID: parseInt(window.location.search.substring(1)) }
            });
            
            props.callback();
        }
        catch (err){
            console.log(err)
        }
    }

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

    return (
        <div style = {{
            display: "flex",
            justifyContent: "center"
        }}>
            <ThemeProvider theme={themeState[CardState]}>
                <StyledInfoCardContainer>
                    <IconButton
                        onClick = {handleCardSubmit}
                        sx={{
                            position: "absolute",
                            top: "7%",
                            right: "20px",
                            opacity: "0.8"
                        }}
                    >
                        <SaveOutlinedIcon
                            fontSize="large"
                        />
                    </IconButton>

                    <StyledCardDate>
                        {moment().format("MMM Do")}
                    </StyledCardDate>
                    <StyledCardTitle>
                        <ContentEditable
                            html={cardText.current}
                            onBlur={handleBlur}
                            disabled={false}
                            onChange={handleChange}
                        />
                    </StyledCardTitle>

                    <StyledTagContainer onClick={handleState}>
                        <StyledTagName>
                            {CardState}
                        </StyledTagName>
                    </StyledTagContainer>
                </StyledInfoCardContainer>
            </ThemeProvider>
        </div>
    )

}

export default NewCard;