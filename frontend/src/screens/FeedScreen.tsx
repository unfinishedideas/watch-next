import './FeedScreen.css';

import { useState, useEffect } from 'react';

//import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';

import API from '../api/Api.ts';


const FeedScreen: React.FC = () =>
{
    const [lists, setLists] = useState([]);
    
    useEffect(() => {
    const api = new API();
        function LoadLists()
        {
            const fetchLists = async () => {
                let data = await api.GetLists();
                setLists(data)
            }
            fetchLists()
            .catch(console.error);
        }
        //LoadMovies();
        //LoadUsers();
        LoadLists();
    },[api]);



    return(
        <div className="feed-screen-container">
            {lists.map((list, index) => (<ListCard listData={list} key={index}/>))}
        </div>
    )
}

export default FeedScreen;
