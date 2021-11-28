import * as React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../gql/queries';
import styled from 'styled-components';
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { responsePathAsArray } from 'graphql';
import { ADD_CARD } from '../gql/mutations';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton';


const GithubSync = function (props) {
    const [message, setMessage] = useState('');
    const [state, setState] = useState('');
    const [title, setTitle] = useState();

    const preciseMatcher = new RegExp(/(!canban.)(?<method>update|update|new|destroy)(?<data>\([A-z, ]*\))/g);
    const weakMatcher = new RegExp(/(!canban.)(?<method>update|[A-z]*)(?<data>\([A-z, ]*\))/g)
    const overflowItems = [];

    const getCanbanData = (str, matcher) => {
        const [textBefore, canbanMatch, method, data, textAfter] = str.split(matcher);

        return {
            canbanMatch: !!canbanMatch,
            method,
            data,
            textAfter,
        }
    }

    const parseDataField = (data) => {
        if (data !== '') {
            const [title, state] = data.substr(1, data.length - 2).split(',');

            return {
                title: title.trim(),
                state: state.trim(),
            }
        }

        return {
            title: 'no syntax',
            state: 'no syntax'
        }
    }

    const getData = (str) => {
        const preciseMatchRes = getCanbanData(str, preciseMatcher);
        const weakMatchRes = getCanbanData(str, weakMatcher);

        return {
            isCanban: preciseMatchRes.canbanMatch || weakMatchRes.canbanMatch,
            isValidMethod: !!preciseMatchRes.method,
            method: preciseMatchRes.method || weakMatchRes.method,
            data: parseDataField(preciseMatchRes.data || weakMatchRes.data || '')
        }
    }

    const processData = (message) => {
        const { isCanban, isValidMethod, method, data, textAfter } = getData(message);
        if (isCanban && isValidMethod) {
            console.log(data.state.toLowerCase());
            if (data.state.toLowerCase() == "todo") {
                handleNewCard(data.title,data.state.toLowerCase())
                return (console.log('hurray, new card added'))
            }
            else if (data.state.toLowerCase() == "inprogress") {
                handleNewCard(data.title,data.state.toLowerCase())
                return (console.log('hurray, new card added'))
            }
            else if (data.state.toLowerCase() == "complete") {
                handleNewCard(data.title,data.state.toLowerCase())
                return (console.log('hurray, new card added'))
            }
            else {
                return (console.log('state was invalid'))
            }
        }
        if (isCanban && !isValidMethod) {
            return console.log('Method was wrong');
        }
        else {
            return console.log('nothing to do here')
        }

    }
    const [mutateCard] = useMutation(ADD_CARD);
    const handleNewCard = async (title, state) => {
        var stateCamelCase = '';
        if(state == 'todo') {
            stateCamelCase = 'toDo'
        }
        if (state == 'inprogress') {
            stateCamelCase = 'inProgress'
        }
        if (state == 'complete') {
            stateCamelCase = 'complete'
        }
        console.log(stateCamelCase);
        try {
            const mutationResponse = await mutateCard({
                variables: {
                    title: title,
                    state: stateCamelCase, 
                    workspaceID: window.location.search.substring(1),
                    color: 'lightBlue',
                    autoImport: true,
                }
            });
            props.callback();

        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchGithubCommit = async function () {
        const response = await fetch(`https://api.github.com/repos/${props.userData}/${props.repo}/commits`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        const data = await response.json();
        const messageData = data[0].commit.message;
        console.log(messageData);
        processData(messageData)
        // setMessage(messageData);
        // console.log(message);
    }

    // React.useEffect(() => {
    //     if(message !== '') {
    //         processData(message)
    //     }
    // },[message])


    return (
        <div>
            <IconButton onClick={fetchGithubCommit}

            >
                <SyncIcon fontSize = "large"
                sx = {{fontSize: "30px"}}
                >
                </SyncIcon>
            </IconButton>
        </div>
    )
}

export default GithubSync;