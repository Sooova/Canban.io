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


const StyledDashboardContainer = styled.div`
    margin-left: ${props => props.width + "px"};
`

const Projects = function() {
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


    return (
        <>
            <Sidebar parentRef={sidebarRef} />
            <StyledDashboardContainer width={sidebarWidth}>
                <CanbanContainer/>
            </StyledDashboardContainer>
        </>
    )
}
export default Projects;