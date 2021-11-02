import React from "react";
import { IconButton } from "@mui/material";
import styled from 'styled-components';
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

const OptionsButton = function (props) {
    const styleFalse = {
        position: "absolute",
        right: "10px",
        top: "2px"
    }

    const styleTrue = {
        position: "absolute",
        right: "10px",
        top: "14px"

    }

    return (
        <div style={props.optionsMiddle == false ? styleFalse: styleTrue}>
            <IconButton onClick={props.handleOpen}>
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
        </div>

    )
}

export default OptionsButton;