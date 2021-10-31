import React from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import moment from "moment";
import CardKanban from "./CardKanban";
import ContentEditable from 'react-contenteditable'
import { useState, useRef } from "react";
import { CREATE_WORKSPACE } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const NewWorkspace = function () {

    const [mutateWorkspace] = useMutation(CREATE_WORKSPACE);
    const [title, setTitle] = useState('');
    const [repo, setRepo] = useState('');

    const handleNewWorkspace = async (e) => {
        e.preventDefault()
        try {
            console.log(title);
            console.log(repo);
            const mutationResponse = await mutateWorkspace({
                variables: {
                    title: title ,
                    repositoryName: repo  }
            });

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChangeTitle = function(e) {
        setTitle(e.target.value);
    }
    

    const handleChangeRepo = function(e) {
        setRepo(e.target.value);
    }

    return (
        <div>
            <form onSubmit = {handleNewWorkspace}>
                <label for="title">First name:</label><br/>
                <input onChange = {handleChangeTitle} type="text" id="title" name="title" value={title}/><br></br>
                <label for="repo">First name:</label><br/>
                <input onChange = {handleChangeRepo} type="text" id="repo" name="repo" value={repo}/><br></br>
                <input type="submit" value="Submit"/>
            </form>
        </div>

    )
}

export default NewWorkspace