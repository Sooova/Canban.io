import React, { useRef, useState, useEffect } from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import DvrIcon from '@mui/icons-material/Dvr';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import logo from '../assets/images/canban transparent.png'
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCards";
import { QUERY_USER, GET_WORKSPACES } from "../gql/queries";
import { DELETE_WORKSPACE } from "../gql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import CanbanContainer from "../components/CanbanContainer";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IconButton } from "@mui/material";
import RightSidebar from "../components/RightSidebar";

const StyledDashboardContainer = styled.div`
    margin-left: ${props => props.width + 20 + "px"};
`

const StyledCanbanHeadings = styled.h2`
font-family: "DM Sans", sans-serif;
font-size: 25px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.7;
margin-bottom:2%;

`;

const StyledContainingDiv = styled.div`
display: flex;
justif-content: space-between;
flex-direction: column;
background-color: white;
border-radius: 30px;
padding: 50px;
flex-grow: 1;
margin-right:50px;
@media (max-width: 550px) {
    padding:15px;
    margin-right:10px;
}
`;

const Dashboard = () => {
    const [sidebarWidth, setSidebarWidth] = useState("10px");
    const sidebarRef = useRef();
    const { loading, error, data, refetch } = useQuery(GET_WORKSPACES);

    const [deleteWorkspace] = useMutation(DELETE_WORKSPACE);


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

    // const {_id, email, githubUser} = data.User;
    return (
        <div style={{
            marginTop: "60px"
        }}>
            <Sidebar parentRef={sidebarRef} />
            <StyledDashboardContainer width={sidebarWidth}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                }}>
                    <StyledContainingDiv>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexDirection:"row"
                        }}>
                            <StyledCanbanHeadings>
                                Projects
                            </StyledCanbanHeadings>
                            <IconButton>
                                <AddCircleOutlineOutlinedIcon
                                    sx={{
                                        transform: "scale(1.5)"
                                    }}
                                    fontSize="large" />
                            </IconButton>
                        </div>

                        {data && data.getWorkspaces.map((workspace) => {
                            return (
                                <ProjectCard
                                    title={workspace.title}
                                    repoName={workspace.repositoryName}
                                    userName={"sooova"}
                                    updatedAt={parseInt(workspace.updatedAt)}
                                    workspaceID={workspace.id}
                                    callback={() => refetch()}
                                    editButton={true}
                                />
                            )
                        })}
                    </StyledContainingDiv>
                    <RightSidebar
                    width = {"1336"} />
                </div>


            </StyledDashboardContainer>

        </div>

    )
}

export default Dashboard;