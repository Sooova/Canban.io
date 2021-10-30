import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import moment from "moment";
import CardKanban from "./CardKanban";
import ContentEditable from 'react-contenteditable'
import { useState, useRef } from "react";
import { ADD_CARD, UPDATE_WORKSPACE } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { IconButton } from "@mui/material";
import ProjectCard from "../components/ProjectCards";

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
background-color: #fee4cb;
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

const EditWorkspace = function (props) {

    const workspaceText = useRef(props.title)
    const handleChange = (e) => {
        workspaceText.current = e.target.value;
    };

    const handleBlur = () => {
        console.log(workspaceText.current);
    }

    const handleRepositoryLink = function (e) {
        e.stopPropagation();
        window.open(`https://github.com/${props.userName}${props.repoName}`, '_blank').focus();
    }

    const [updateWorkspace] = useMutation(UPDATE_WORKSPACE);

    const handleWorkspaceUpdate = async (id, title, repositoryName) => {
        try {
            const mutationResponse = await updateWorkspace({
                variables: {
                    id: props.workspaceID, title: workspaceText.current.slice(0,workspaceText.current.length-4)}
            });
            props.callback();
        }
        catch (err){
            console.log(err)
        }
    }


    return (
        <div style={{ padding: "8px", transition: "0.2s" }}>
            <StyledProjectBox>
                <StyledProjectBoxHeader>
                    <span style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        fontSize: "12px"
                    }}>{moment(props.updatedAt).format("MMM Do")}</span>
                    <div style={{ position: "absolute", right: "0px", top: "2px" }}>
                        <IconButton
                            onClick={handleWorkspaceUpdate}
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

                    </div>
                </StyledProjectBoxHeader>

                <StyledProjectBoxContentHeader>
                    <StyledHeaderP>
                        <ContentEditable
                            html={workspaceText.current}
                            onBlur={handleBlur}
                            disabled={false}
                            onChange={handleChange}
                        />
                    </StyledHeaderP>
                </StyledProjectBoxContentHeader>

                {props.repoName ?
                    <StyledRepoNameDiv onClick={handleRepositoryLink}>
                        {props.repoName}
                    </StyledRepoNameDiv>
                    : ""
                }

            </StyledProjectBox>
        </div>
    )
}

export default EditWorkspace;