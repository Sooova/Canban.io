import React, { useState } from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
    font-family: "DM Sans", sans-serif;
    font-size:15px;
    color: rgb(31, 28, 46);
    font-weight: 400;
    opacity:0.7;
`;

const StyledContainer = styled.div`
    border 2px solid grey;
    border-radius: 10px;
    border-style: dashed;
    display:flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
    min-height: 70px;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
    box-sizing: border-box;
    border-width: 3px;

`;

const AddWorkspaceContainer = function (props) {



    return (
        <div style = {{
            padding: "8px",
            transition: "all 0.2s ease 0s"
        }}>

            <StyledContainer onClick = {props.handleOpen}>
            <StyledP>
                Click to add a new Workspace
            </StyledP>
            </StyledContainer>

        </div>
    )
}

export default AddWorkspaceContainer;