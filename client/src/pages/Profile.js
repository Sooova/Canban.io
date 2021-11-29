//add in profile page
import React, { useState, useRef, useEffect } from 'react';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GithubDetails from '../components/GithubDetails';
import { StyledText } from '../components/Text';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../gql/queries';
import Sidebar from "../components/Sidebar";
import { keyframes } from "styled-components";
import questionMark from "../assets/images/questionmark.png"

const StyledContainingDiv = styled.div`
    display:flex;
    flex-direction:row;

`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledLeftDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledUserProfile = styled.img`
width: 70px;
height: 70px;
border-radius: 50%;
position: relative;
overflow: hidden;
margin-right: 20px;
`;

const StyledQuestionMark = styled.img`
width: 15px;
height: 15px;
position: relative;
overflow: hidden;
margin-right: 10px;
opacity:0.8;
&:hover {
    opacity:1;
    cursor: help;
}
`;

const StyledQuestionMarkDiv = styled.div`
&:hover {
    opacity:1;
    cursor: help;
    &:after {
    content: "Your account was created before timestamps ";
  }
}
`;

const StyledInput = styled.input`
    padding: 5px;
    border-radius:4px;
    border: 1.5px solid rgba(0,0,0,0.5);
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    width:250px;
    font-family: "DM Sans", sans-serif;
    font-weight:300;
    font-size: 13px;
    height:14px;
`;

const StyledContainer = styled.div`
    margin-left: ${props => props.width + 40 + "px"};
    animation: ${fadeIn} 0.5s linear; 
    animation-fill-mode: forwards;
`

const Profile = function () {
    const { data, refetch } = useQuery(QUERY_USER);
    const [sidebarWidth, setSidebarWidth] = useState("10px");
    const sidebarRef = useRef();

    useEffect(() => {
        const updateWidth = () => {
            setSidebarWidth(sidebarRef.current.offsetWidth);
        }

        window.addEventListener('resize', updateWidth);
        updateWidth()

        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    }, [])
    return (
        <>
            <Sidebar parentRef={sidebarRef} />
            <StyledContainer width={sidebarWidth} >

                <StyledText
                    fontSize={"45px"}
                    fontWeight={700}
                    opacity={1}
                >
                    My Profile
                </StyledText>
                <StyledContainingDiv>
                    <StyledLeftDiv>
                        <StyledText
                            fontSize={"15px"}
                            fontWeight={500}
                            opacity={0.6}
                            style={{
                                marginTop: "40px"
                            }}
                        >
                            Your Photo
                        </StyledText>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingTop: "20px",
                                paddingBottom: "20px",
                            }}
                        >

                            {data && data ?
                                <StyledUserProfile src={`https://github.com/${data.user.githubUser}.png?size=200`} />
                                :
                                ''
                            }
                            <StyledText
                                fontSize={"15px"}
                                fontWeight={300}
                                opacity={1}
                                style={{
                                    textDecoration: "underline",
                                }}
                            >
                                Change Your Photo
                            </StyledText>
                        </div>
                        {data && data ?
                            <>
                                <StyledText
                                    fontSize={"15px"}
                                    fontWeight={500}
                                    opacity={0.6}
                                    style={{
                                        marginTop: "5px"
                                    }}
                                >
                                    Your Name
                                </StyledText>
                                <form>
                                    <StyledInput type="text" value={`${data.user.firstName} ${data.user.lastName}`} ></StyledInput>
                                </form>
                                <StyledText
                                    fontSize={"15px"}
                                    fontWeight={500}
                                    opacity={0.6}
                                >
                                    Your Email
                                </StyledText>
                                <form>
                                    <StyledInput type="email" value={data.user.email}></StyledInput>
                                </form>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        marginBottom: "30px"
                                    }}
                                >
                                    <StyledText
                                        fontSize={"15px"}
                                        fontWeight={300}
                                        opacity={1}
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Change Your Password
                                    </StyledText>
                                    {data.user.createdAt ?
                                        <StyledText
                                            fontSize={"12px"}
                                            fontWeight={300}
                                            opacity={1}
                                            style={{
                                                maxWidth: "200px"
                                            }}
                                        >
                                            {data.user.createdAt}
                                        </StyledText>
                                        :
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}>
                                            <div>
                                                <StyledQuestionMark src={questionMark} />
                                            </div>
                                            <StyledText
                                                fontSize={"12px"}
                                                fontWeight={300}
                                                opacity={1}
                                                style={{
                                                    maxWidth: "200px"
                                                }}
                                            >
                                                Account Created Before November 30th, 2021
                                            </StyledText>
                                        </div>
                                    }
                                </div>
                            </>
                            :
                            ''
                        }

                        <GithubDetails />
                    </StyledLeftDiv>

                </StyledContainingDiv>
            </StyledContainer>
        </>
    )
}

export default Profile;