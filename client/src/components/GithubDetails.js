import React, { useState } from "react";
import styled from 'styled-components';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../gql/queries";
import { Octokit } from "octokit";
import moment from "moment";
import { StyledText } from "./Text";

const StyledContainer = styled.div`
    border-radius:10px;
    border: 2px solid black;
    background-color: white;
    padding:20px;
    width:400px;

`;

const StyledUserProfile = styled.img`
width: 70px;
height: 70px;
border-radius: 50%;
position: relative;
overflow: hidden;
margin-right: 20px;
`;

const StyledDetailsParentContainer = styled.div`
    display: flex;
    flex-direction:row;
`;

const StyledDetailsTextDiv = styled.div`
    display:flex;
    flex-direction:column;

`;

const GithubDetails = function () {
    const { data, refetch } = useQuery(QUERY_USER);
    const [creationDate, setCreationDate] = useState();
    const octokit = new Octokit({
        baseUrl: 'https://api.github.com',
    });
    if (data) {
        const userInfo = async () => {
            const response = await octokit.request(`GET /users/${data.user.githubUser}`, {
                username: `${data.user.githubUser}`
            })
            setCreationDate(dateConversion(response.data.created_at.substr(0,10)));
        }
        userInfo();
    }

    const dateConversion = function(string) {
        return moment(string, 'YYYY-MM-DD').format('MMM DD, YYYY');
    }

    return (
        <>
            <StyledContainer>
                <StyledText
                    fontSize={"20px"}
                    fontWeight={300}
                    opacity={1}
                >
                    Github Details
                </StyledText>
                <div
                    style={{
                        paddingTop: "20px"
                    }}
                >
                    {data && data ?
                        <StyledDetailsParentContainer>
                            <StyledUserProfile src={`https://github.com/${data.user.githubUser}.png?size=200`} />
                            <StyledDetailsTextDiv>
                                <StyledText
                                    fontSize={"20px"}
                                    fontWeight={500}
                                    opacity={1}
                                >
                                    {data.user.githubUser}
                                </StyledText>
                                <StyledText
                                    fontSize={"15px"}
                                    fontWeight={300}
                                    opacity={0.8}
                                    style={{
                                        paddingTop: "5px"
                                    }}
                                >
                                    GitHub member since {creationDate}
                                </StyledText>
                                <a href={`https://github.com/${data.user.githubUser}`} >
                                    <StyledText
                                        fontSize={"15px"}
                                        fontWeight={300}
                                        opacity={1}
                                        style={{
                                            paddingTop: "25px"
                                        }}
                                    >
                                        Visit GitHub Profile
                                    </StyledText>
                                </a>
                                <StyledText
                                    fontSize={"15px"}
                                    fontWeight={300}
                                    opacity={1}
                                    style={{
                                        paddingTop: "15px",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Change GitHub User
                                </StyledText>
                            </StyledDetailsTextDiv>
                        </StyledDetailsParentContainer>
                        :
                        ''
                    }
                </div>


            </StyledContainer>

        </>
    )
}

export default GithubDetails;