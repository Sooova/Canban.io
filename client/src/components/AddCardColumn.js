import React, { useState } from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
font-family: "DM Sans", sans-serif;
font-size:15px;
color: rgb(31, 28, 46);
font-weight: 400;
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    alignItems: center;
    opacity: 0.7;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

const AddCardColumn = function (props) {
    

    return (
        <StyledContainer onClick = {() => {props.initialStateCallback(props.state)}}>
            <StyledP>
                <span
                    style={{
                        fontSize: "18px"
                    }}>+</span> Add new card
            </StyledP>

        </StyledContainer>

    )
}

export default AddCardColumn;