import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../gql/queries';
import styled from 'styled-components';
import { useState, useRef } from "react";
import { CREATE_WORKSPACE } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const StyledCanbanHeadings = styled.h2`
font-family: "DM Sans", sans-serif;
color: rgb(31, 28, 46);
font-size: 16px;
line-height: 24px;
font-weight: 700;
opacity: 0.7;
text-align:center;

`;

const StyledDot = styled.span`
height: 25px;
width: 25px;
background-color: ${props => props.bg};
border-radius: 50%;
display: inline-block;
margin: 10px;
position:relative;
opacity: 0.7;
&:hover {
    opacity:1;
    cursor:pointer;
}
`;

const StyledRightP = styled.p`
font-family: "DM Sans", sans-serif;
font-size:15px;
color: rgb(31, 28, 46);
font-weight: 600;
opacity:0.7;
padding-bottom: 10px;
`;

const StyledButton = styled.button`
  background-color: white;
  font-family: "DM Sans", sans-serif;
  border-radius: 30px;
  font-size: 10px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 12px;
  outline: 0;
  border: 1px solid grey;
  cursor: pointer;
  color: rgb(31, 28, 46);
  width:100px;
  display:block;
  opacity: 1;
  margin-top: 20px;
  margin-left:20px;
  &:hover {
      background-color: #f5eded;
  }
`;



export default function AsyncWorkspaceCreate(props) {
    var renderAsync = false;
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { error, data, refetch } = useQuery(QUERY_USER);
    const [mutateWorkspace] = useMutation(CREATE_WORKSPACE);
    const [repo, setRepo] = useState('');
    if(data) {
        if(data.user.githubUser == '') {
            renderAsync = false;
        }
        else {
            renderAsync = true;
        }
    }


    const handleNewWorkspace = async (e) => {
        e.preventDefault()
        try {
            const mutationResponse = await mutateWorkspace({
                variables: {
                    title: value,
                    repositoryName: repo,
                    workspaceColor: circleColor
                }
            });
            props.callback();
            props.modalClose();
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChangeRepo = function (e) {
        setRepo(e.target.textContent);
    }


    const themeColor = {
        pink: {
            bg: "#FFE6E3",
        },
        purple: {
            bg: "#A0A0FA",
        },
        green: {
            bg: "#D0FCDB",
        },
        lightBlue: {
            bg: "#CEDDFF"
        },
        lightYellow: {
            bg: "#FFEFC6"
        }
    }

    //
    const [value, setValue] = React.useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    //color
    const [circleColor, setColor] = useState('pink')
    const handleColorChange = (e) => {
        console.log(e.target.id);
        setColor(e.target.id)
    }




    React.useEffect(() => {
        let active = true;
        const githubUser = data && data.user.githubUser
        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&page=1`)
            const data = await response.json();
            console.log(data);
            const repoList = data.map((data) => ({
                name: data.name
            }))

            if (active) {
                setOptions([...repoList]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, data]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "500px", 
        }}>

            <StyledCanbanHeadings>
                New Workspace
            </StyledCanbanHeadings>
            <TextField
                fullWidth
                size="large"
                id="standard-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                value={value}
                onChange={handleChange}
                variant="standard"
            />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "30px",
            }}>
                <div>
                    <StyledDot id="pink" onClick={handleColorChange}
                        bg={"#FFE6E3"}
                    />
                    <StyledDot id="purple" onClick={handleColorChange}
                        bg={"#A0A0FA"}
                    />
                    <StyledDot id="green" onClick={handleColorChange}
                        bg={"#D0FCDB"}
                    />
                    <div styles={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <StyledDot id="lightBlue" onClick={handleColorChange}
                            bg={"#CEDDFF"}
                        />
                        <StyledDot id="lightYellow" onClick={handleColorChange}
                            bg={"#FFEFC6"}
                        />
                    </div>

                </div>
                <div>
                    <StyledRightP>
                    {renderAsync == true ? 'Select Repository':'No Github User Saved'}
                    </StyledRightP>
                    {renderAsync == true &&
                    <Autocomplete
                        id="asynchronous-demo"
                        name = "repo"
                        sx={{ width: 300 }}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={(event) => {
                            setOpen(false);
                            handleChangeRepo(event)
                        }}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Link a repository"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    }
                </div>
            </div>
            <div style = {{
                flexGrow: "1"
            }}>
                <div style = {{
                    display: "flex", 
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between"

                }}
                >
                    <div style = {{
                        backgroundColor: themeColor[circleColor].bg,
                        flexGrow: "1",
                        borderRadius: "30px"
                    }}>
                        <StyledRightP style = {{
                            padding:"10px",
                        }}>
                            Color Preview
                        </StyledRightP>
                    </div>
                    <StyledButton onClick = {handleNewWorkspace}>
                        Save
                    </StyledButton>
                </div>
            </div>
        </div>
    );
}