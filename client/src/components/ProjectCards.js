import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import moment from "moment";
import CardKanban from "./CardKanban";
import ContentEditable from 'react-contenteditable'
import { useState, useRef } from "react";
import { ADD_CARD, DELETE_WORKSPACE } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { IconButton } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import EditWorkspace from "./EditWorkspace";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "30px",
    p: 4,
};

const StyledProjectBox = styled.div`
display: flex;
border-radius: 10px;
position: relative;
padding: 16px;
box-sizing: border-box;
`;

const StyledProjectBoxHeader = styled.div`
order: 2;
margin-right:24px;
display:flex;
align-items: ceneter;
justify-content: space-between;
margin-bottom:16px;
color: #1f1c2e;
`;

const StyledMoreButton = styled.button`
padding: 0;
width: 24px;
height:24px;
position: relative;
background-color:transparent;
border:none;
flex-shrink: 0;
cursor:pointer:
opacity:0.6;
&:hover {
    cursor:pointer;

}
`;

const StyledProjectBoxContentHeader = styled.div`
order: 1;
max-width:120px;
text-align: center;
margin-bottom: 16px;
max-width:300px;

`;

const StyledHeaderP = styled.p`
text-align: left;
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
font-size:16px;
line-height:24px;
font-weight:700;
opacity:0.7;
font-family: "DM Sans", sans-serif;
@media (max-width: 550px) {
    font-size:15px;
}
`;



const StyledRepoNameDiv = styled.div`
background-color: rgba(255, 255, 255, 0.6);
font-size:12px;
border-radius: 20px;
flex-shrink: 0;
padding: 4px 10px;
font-weight:700;
position:absolute;
bottom: 5px;
right:10px;
opacity:0.7;
&:hover {
    opacity:0.5;
    cursor:pointer;

}
@media (max-width: 550px) {
    font-size:9px;
}

`;

const StyledCanbanHeadings = styled.h2`
font-family: "DM Sans", sans-serif;
font-size: 25px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.7;
margin-bottom:2%;
@media (max-width: 921px) {
  font-size:20px
}
@media (max-width: 745px) {
  font-size:15px
}

`;

export {StyledCanbanHeadings}

const ProjectCard = function (props) {
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
        },
        lightYellow: {
            bg: "#FFEFC6"
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = function (e) {
        e.stopPropagation();
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    function getBaseURL() {
        return window.location.protocol + "//" + window.location.hostname +
            (window.location.port && ":" + window.location.port) + "/";
    }

    const handleRepositoryLink = function (e) {
        e.stopPropagation();
        window.open(`https://github.com/${props.userName}/${props.repoName}`, '_blank').focus();
    }

    const handleCanbanURL = function () {

        window.location.replace(`${getBaseURL()}projects?${props.workspaceID}`)
    }

    return (
        <div style={{ padding: "8px", transition: "0.2s"}}>
            <StyledProjectBox style = {{
                backgroundColor: themeColor[props.workspaceColor].bg
            }} onClick={handleCanbanURL}>
                <StyledProjectBoxHeader>
                    <span style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        fontSize: "12px"
                    }}>{moment(props.updatedAt).format("MMM Do")}</span>
                    <div style={{ position: "absolute", right: "10px", top: "2px" }}>
                        {props.editButton &&
                            <IconButton onClick={handleOpen}>
                                <StyledMoreButton >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="12" cy="5" r="1"></circle>
                                        <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                </StyledMoreButton>
                            </IconButton>
                        }

                    </div>
                </StyledProjectBoxHeader>

                <StyledProjectBoxContentHeader>
                    <StyledHeaderP>
                        {props.title}
                    </StyledHeaderP>
                </StyledProjectBoxContentHeader>

                {props.repoName ?
                    <StyledRepoNameDiv onClick={handleRepositoryLink}>
                        {props.repoName}
                    </StyledRepoNameDiv>
                    : ""
                }

            </StyledProjectBox>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <StyledCanbanHeadings>
                            Edit Workspace
                        </StyledCanbanHeadings>
                        <EditWorkspace
                            title={props.title}
                            repoName={props.repoName}
                            userName={"sooova"}
                            updatedAt={parseInt(props.updatedAt)}
                            workspaceID={props.workspaceID}
                            editButton={true}
                            callback = {() => props.callback()}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ProjectCard;