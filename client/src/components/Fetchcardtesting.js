import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOGIN } from '../gql/mutations';
import Auth from '../utils/auth';
import { FETCH_ALL_CARDS } from '../gql/queries';



function FetchComponent(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [fetchCards, { error }] = useQuery(FETCH_ALL_CARDS);
    const handleCards = async (event) => {
        try {
            const queryResponse = await fetchCards();
            console.log(queryResponse)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <button onClick={handleCards}>
                test    
            </button>
        </>
    )
}

export default FetchComponent;



// const [fetchCards, { error }] = useQuery(FETCH_CARDS);
// const handleCards = async (event) => {
//     const query = new URLSearchParams(window.location.search);
//     const token = query.get('workspace')
//     try {
//         const queryResponse = await fetchCards({
//             variables: { workspaceID: token },
//         });
//         console.log(queryResponse)
//     } catch (e) {
//         console.log(e);
//     }
// };