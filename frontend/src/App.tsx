import './App.css'

import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'

import { useQuery } from '@tanstack/react-query'
/*
import FeedScreen from './screens/FeedScreen.tsx'
                <FeedScreen/>
*/

import { QueryClient, useQueryClient,  } from '@tanstack/react-query'
import { useState } from 'react'

import { GetMovies, GetMovie, CreateMovie, UpdateMovie, DeleteMovie } from './api/MovieApi.ts'

function App()
{
    const queryClient = useQueryClient();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {data } = useQuery({queryKey: ['huh'], queryFn: GetMovies });
    
    function get_movies()
    {
        console.log(data);
    }
    async function get_movie()
    {
       const data = await GetMovie("001"); 
    }
    
    return(
        <div className="app-container">
            <Header/>
            {isLoggedIn ? 
                <div/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
            }
            <button type="button" onClick={get_movies}>Get Movies</button>
        </div>
    )
}

export default App;

