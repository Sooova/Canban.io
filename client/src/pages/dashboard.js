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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import AsyncWorkspaceCreate from "../components/RepoAsync";
import canbanloading from "../assets/images/canbanloading.gif";
import AddWorkspaceContainer from "../components/AddWorkspaceContainer";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: "30px",
    p: 4,
    paddingBottom: "50px",
    display: "flex",
    justifyContent: "center",
};

const StyledCanbanLoader = styled.img`
    width:100px;
    margin-left: auto;
    margin-right: auto;
    margin-top:100px;
    padding-bottom:100px;
`;

const Dashboard = () => {
    function getBaseURL() {
        return window.location.protocol + "//" + window.location.hostname +
            (window.location.port && ":" + window.location.port) + "/";
    }
    const [sidebarWidth, setSidebarWidth] = useState("10px");
    const sidebarRef = useRef();
    const { loading, error, data, refetch } = useQuery(GET_WORKSPACES);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    if (Auth.loggedIn()) {

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
                                flexDirection: "row"
                            }}>
                                <StyledCanbanHeadings>
                                    Workspaces
                                </StyledCanbanHeadings>
                                <IconButton onClick={handleOpen}>
                                    <AddCircleOutlineOutlinedIcon
                                        sx={{
                                            transform: "scale(1.5)"
                                        }}
                                        fontSize="large" />
                                </IconButton>
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
                                            <AsyncWorkspaceCreate
                                                modalClose={handleClose}
                                                callback={() => refetch()}
                                            />
                                        </Box>
                                    </Fade>
                                </Modal>
                            </div>

                            {data && data.getWorkspaces.map((workspace) => {
                                return (
                                    <ProjectCard
                                        title={workspace.title}
                                        repoName={workspace.repositoryName}
                                        userName={"sooova"}
                                        updatedAt={parseInt(workspace.updatedAt)}
                                        workspaceID={workspace.id}
                                        workspaceColor={workspace.workspaceColor}
                                        callback={() => refetch()}
                                        editButton={true}
                                    />
                                )
                            })}
                            <AddWorkspaceContainer
                                handleOpen={handleOpen}
                            />
                            {loading ?
                                <StyledCanbanLoader src={canbanloading} />
                                : ""
                            }
                        </StyledContainingDiv>
                        <RightSidebar
                            width={"1336"} />
                    </div>


                </StyledDashboardContainer>

            </div>

        )
    } else {
        window.location.replace(`${getBaseURL()}`)
    }
}

export default Dashboard;