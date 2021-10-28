import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import CardKanban from "./CardKanban";
import { useQuery } from "@apollo/client";
import { FETCH_CARDS } from "../gql/queries";

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

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
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

const columnsInitial = {
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
}


function CanbanContainer() {
    const [columns, setColumns] = useState(columnsInitial);


    const { loading, error, data } = useQuery(FETCH_CARDS, {
        variables: {
            workspaceID: 1234
        }
    });

    const sortCards = function (data) {
        console.log(columns)

        const columnCopy = { ...columns }

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
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <StyledCanbanHeadings>
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
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    height: 500,
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
                                                                            key= {item.id}
                                                                            id = {item.id}
                                                                            state = {column.name}
                                                                            title = {item.title}
                                                                            time = {item.updatedAt}
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
            </DragDropContext>
        </div>
    );
}

export default CanbanContainer;

