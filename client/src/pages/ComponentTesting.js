import React from "react";
import styled from 'styled-components';
import CanbanConfused from "../assets/images/canban confused shaken.png";
import { LandingAbout } from "./Home";
import { Link } from "react-router-dom";
import CardKanban from "../components/CardKanban";


const ComponentTesting = function () {
    return (
        <>
            <CardKanban
                key={1234}
                // id={item.id}
                state={'inProgress'}
                title={'test title'}
                time={'1638073349'}
                cardColor={'lightBlue'}
                autoImport = {true}
                // callback={() => refetch()}
            />
        </>
    )
}

export default ComponentTesting;