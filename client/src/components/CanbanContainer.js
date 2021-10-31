import React, { useEffect, useState, useRef } from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import CardKanban from "./CardKanban";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_CARDS, FETCH_WORKSPACE_NAME } from "../gql/queries";
import { borderRadius } from "@mui/system";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import NewCard from "./NewCard";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import { UPDATE_CARD } from "../gql/mutations";
import RightSidebar from "./RightSidebar";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const StyledProjectHeading = styled.h2`
font-family: "DM Sans", sans-serif;
font-size: 35px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.7;
padding-bottom:30px;
padding-top:30px;
display:inline;
@media (max-width: 921px) {
  font-size:20px
}
@media (max-width: 745px) {
  font-size:15px
}
`;

const StyledCanbanParentContainer = styled.div`

`;

const StyledCanbanContainerColumn = styled.div`

`;

const StyledCanbanHeadings = styled.h2`
font-family: "DM Sans", sans-serif;
font-size: 25px;
color: rgb(31, 28, 46);
font-weight: 700;
opacity: 0.7;
margin-bottom:2%;
@media (max-width: 921px) {
  font-size:20px
}
@media (max-width: 745px) {
  font-size:15px
}
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

const stateArray = [
    {
        value: 'toDo',
        label: 'toDo',
    },
    {
        value: 'inProgress',
        label: 'inProgress',
    },
    {
        value: 'complete',
        label: 'complete',
    },
];

const columnsFromBackend = {
    [uuid()]: {
        name: "To do",
        items: []
    },
    [uuid()]: {
        name: "In Progress",
        items: []
    },
    [uuid()]: {
        name: "Done",
        items: []
    }
};

const onDragEnd = (result, columns, setColumns, handleCardUpdate) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        //state
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }

        });
        console.log(destination.droppableId);
        console.log(removed.id);
        handleCardUpdate(removed.id, destination.droppableId)

    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const columnsInitial = () => ({
    toDo: {
        name: "toDo",
        items: []
    },
    inProgress: {
        name: "inProgress",
        items: []
    },
    complete: {
        name: "complete",
        items: []
    }
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "30px",
    p: 4,
    paddingBottom: "50px",
};

function CanbanContainer() {
    //ADD IN FUNCTIONALITY TO GET REPOSITORY DESCRIPTION
    // const { data:userData,} = useQuery(QUERY_USER);

    // const getRepoDescription = async () => {
    //     const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&page=1`)
    //     const data = await response.json();
    //     console.log(data);
    //     const repoList = data.map((data) => ({
    //         name: data.name
    //     }))
    // }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [updateCard] = useMutation(UPDATE_CARD);
    const [value, setValue] = React.useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
        handleTextChange(e);
    };
    const [state, setState] = React.useState('EUR');
    const handleStateChange = (event) => {
        setState(event.target.value);
        setCardState(event.target.value);
    };

    //card state for child component
    const cardState = ['toDo', 'inProgress', 'complete']
    const [CardState, setCardState] = useState(cardState[2])
    const [cardStateIndex, setCardStateIndex] = useState(0)
    const handleState = () => {
        setCardStateIndex((cardStateIndex + 1) % 3);
        console.log(cardStateIndex);
        setCardState(cardState[cardStateIndex]);
        setState(cardState[cardStateIndex]);
    }

    //title state for child component
    const cardText = useRef()
    const handleTextChange = (e) => {
        setValue(e.target.value)
        cardText.current = e.target.value;
    };
    const handleBlur = () => {
        console.log(cardText.current);
    }

    //color to send to child component
    const [circleColor, setColor] = useState('pink')
    const handleColorChange = (e) => {
        console.log(e.target.id);
        setColor(e.target.id)
    }


    const handleCardUpdate = async (id, state, err) => {
        try {
            const mutationResponse = await updateCard({
                variables: {
                    id: id, state: state
                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    const [columns, setColumns] = useState(columnsInitial());


    const { loading, error, data, refetch } = useQuery(FETCH_CARDS, {
        variables: {
            workspaceID: window.location.search.substr(1)
        }
    });

    const {errorWorkspace, data:workspaceData} = useQuery(FETCH_WORKSPACE_NAME, {
        variables: {
            workspaceID: window.location.search.substr(1)
        }
    });

    const sortCards = function (data) {
        console.log(columns)

        const columnCopy = { ...columnsInitial() }

        data.getWorkspaceCards.forEach((card) => {
            const currentCardState = card.state;
            columnCopy[currentCardState].items.push(card)
        })

        setColumns(columnCopy)
        console.log(columns)
    }


    useEffect(() => {
        if (data) {
            sortCards(data);
        }
    }, [data])

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "first baseline",
            marginTop: "5%",
        }}>

            <div style={{
                display: "flex", justifyContent: "center", height: "100%",
                backgroundColor: "white",
                borderRadius: "30px",
                maxWidth: "900px",
                // boxShadow: "0 2px 6px rgba(0, 0, 0, .3)",
                height: "800px",
                position: "relative",
                padding: "30px",
                flexDirection: "column"

            }}>
                <div style = {{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: "30px",
                    marginRight:"30px",
                }}>
                    
                <StyledProjectHeading>
                    {workspaceData && 
                    workspaceData.getWorkspaceName.title
                    }
                </StyledProjectHeading>

                <IconButton onClick={handleOpen} sx={{

                }}>
                    <AddCircleOutlineRoundedIcon
                        fontSize="large" color="rgb(31,28,46)" sx={{
                            transform: "scale(1.2)",
                        }}
                    />
                </IconButton>
                </div>
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
                            <IconButton onClick={handleClose}
                                sx={{
                                    position: "absolute",
                                    top: "5%",
                                    right: "12px",
                                    transform: "scale(1.2)"
                                }}
                            >
                                <HighlightOffIcon
                                    fontSize="large"
                                />
                            </IconButton>
                            <StyledCanbanHeadings>
                                New Card
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
                                    <StyledDot id="lightBlue" onClick={handleColorChange}
                                        bg={"#CEDDFF"}
                                    />
                                </div>
                                <TextField
                                    id="outlined-select-currency"
                                    defaultValue={"complete"}
                                    fullWidth
                                    select
                                    label="Select"
                                    value={state}
                                    onChange={handleStateChange}
                                    helperText="Select card state"
                                >
                                    {stateArray.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <NewCard
                                CardState={CardState}
                                handleState={handleState}
                                cardText={cardText}
                                handleBlur={handleBlur}
                                handleTextChange={handleTextChange}
                                cardColor={circleColor}
                                callback={() => refetch()}
                            />
                        </Box>
                    </Fade>
                </Modal>

                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns, handleCardUpdate)}
                >
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",

                    }}>

                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (    
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                key={columnId}
                            >
                                <StyledCanbanHeadings style={{
                                    marginTop: "30px"
                                }}>
                                    {column.name}
                                </StyledCanbanHeadings>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        borderRadius: "30px",
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "",
                                                        padding: 4,
                                                        width: 250,
                                                        height: 625,
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <CardKanban
                                                                                key={item.id}
                                                                                id={item.id}
                                                                                state={column.name}
                                                                                title={item.title}
                                                                                time={item.updatedAt}
                                                                                cardColor={item.color}
                                                                                callback={() => refetch()}
                                                                            />

                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </DragDropContext>
            </div >
            <RightSidebar
                width={"1500"}
            />
        </div>
    );
}

export default CanbanContainer;

