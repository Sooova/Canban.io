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
import { useQuery } from "@apollo/client";
import CanbanContainer from "../components/CanbanContainer";
import MobileBar from "../components/MobileBar";


const StyledDashboardContainer = styled.div`
    margin-left: ${props => props.width + "px"};
`

const Projects = function () {
    function getBaseURL() {
        return window.location.protocol + "//" + window.location.hostname +
            (window.location.port && ":" + window.location.port) + "/";
    }
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
    const [sidebarWidth, setSidebarWidth] = useState("10px");
    const sidebarRef = useRef();

    if (Auth.loggedIn()) {

        return (
            <>
                <Sidebar parentRef={sidebarRef} />
                <StyledDashboardContainer width={sidebarWidth}>
                    <CanbanContainer />
                </StyledDashboardContainer>
                <MobileBar/>
            </>
        )
    } else {
        window.location.replace(`${getBaseURL()}`)
    }
}
export default Projects;