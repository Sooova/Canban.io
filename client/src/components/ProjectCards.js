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


const ProjectCard = function (props) {

    const handleRepositoryLink = function () {
        window.open(`https://github.com/${props.userName}${props.repoName}`, '_blank').focus();
    }
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
            opacity:1;
            cursor:pointer;
        }
    `;
    return (
            <div style={{ padding: "8px", transition: "0.2s" }}>
                <StyledProjectBox>
                    <StyledProjectBoxHeader>
                        <span style={{
                            position: "absolute",
                            bottom: "16px",
                            left: "16px",
                            fontSize: "12px"
                        }}>December 10, 2020</span>
                        <div style={{ position: "absolute", right: "16px", top: "16px" }}>
                            <StyledMoreButton>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-more-vertical">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="5" r="1"></circle>
                                    <circle cx="12" cy="19" r="1"></circle>
                                </svg>
                            </StyledMoreButton>
                        </div>
                    </StyledProjectBoxHeader>

                    <StyledProjectBoxContentHeader>
                        <StyledHeaderP>
                            Test Project
                        </StyledHeaderP>
                    </StyledProjectBoxContentHeader>

                    {props.repoName ?
                    <StyledRepoNameDiv onClick = {handleRepositoryLink}>
                        {props.repoName}
                    </StyledRepoNameDiv>
                    :""
                }

                </StyledProjectBox>
            </div>
    )
}

export default ProjectCard;