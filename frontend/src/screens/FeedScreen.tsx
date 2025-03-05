import './FeedScreen.css';

import { useState, useEffect } from 'react';

import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';
import Movie from '../classes/Movie.ts';
import User from '../classes/User.ts';

import API from '../classes/Api.ts';


const FeedScreen: React.FC = () =>
{
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [lists, setLists] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            await API.GetMovies()
        }
        fetchData();
        .catch(console.error);
        
        /*
        const fetchData = async () => {
            await fetch("http://localhost:5025/movies")
            .then(response => response.json())
            .then(data => {console.log(data)});
        }
        fetchData()
        .catch(console.error);
        */
    },[]);

    // test objects 
    const testMovies :Movie[] = [
            new Movie("Test Movie 1", 2002, "Jim DirectorMan", 3.5),
            new Movie("Test Movie 2 - The Revenge", 2003, "Jim DirectorMan's Son", 1.5),
    ];
    const testMovies2 :Movie[] = [
            new Movie("Lame Movie 1", 1995, "Penny Marshall", 1.5),
            new Movie("Lame Movie 2: In Space!", 2001, "George Lucas", 0.5),
            new Movie("The Spiral Notebook", 2015, "David Lynch", 5.0),
    ];
    const user1 :User = new User("SaraConnor01");
    const user2 :User = new User("Paul42069");
    const user3 :User = new User("LaurenLikesMovies");
    const list1 :List = new List("Super Movie List", [user1], testMovies);
    const list2 :List = new List("Lame Movie List", [user2, user3], testMovies2);
    // end test objects

    return(
        <div className="feed-screen-container">
            <ListCard listData={list1}/>
            <ListCard listData={list2}/>
        </div>
    )
}

export default FeedScreen;
