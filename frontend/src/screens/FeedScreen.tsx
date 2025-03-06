import './FeedScreen.css';

import { useState, useEffect } from 'react';

import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';
import Movie from '../classes/Movie.ts';
import User from '../classes/User.ts';

import API from '../api/Api.ts';


const FeedScreen: React.FC = () =>
{
    const api = new API();
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [lists, setLists] = useState([]);
    
    useEffect(() => {
        LoadMovies();
        LoadUsers();
        LoadLists();
        
    },[]);

    function LoadMovies()
    {
        const fetchMovies = async () => {
            let data = await api.GetMovies();
            setMovies(data); 
        }
        fetchMovies()
        .catch(console.error);
    }

    function LoadUsers()
    {
        const fetchUsers = async () => {
            let data = await api.GetUsers();
            setUsers(data); 
        }
        fetchUsers()
        .catch(console.error);
    }

    function LoadLists()
    {
        const fetchLists = async () => {
            let data = await api.GetLists();
            setLists(data); 
        }
        fetchLists()
        .catch(console.error);
    }

    return(
        <div className="feed-screen-container">
            {lists.map((list) => (<ListCard listData={list}/>))}
        </div>
    )
}

export default FeedScreen;
