import './App.css'

import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
//import FeedScreen from './screens/FeedScreen.tsx'

import { useState } from 'react'

// testing the API
import { GetMovies, GetMovie, CreateMovie, UpdateMovie, DeleteMovie } from './api/MovieApi.ts'
import { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser } from './api/UserApi.ts'
import { GetLists, GetList, CreateList, UpdateList, DeleteList } from './api/ListApi.ts'

import User from './classes/User.ts'
import Movie from './classes/Movie.ts'
import List from './classes/List.ts'

function App()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    async function get_movies()
    {
        try {
            const data = await GetMovies();
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function get_users()
    {
        try {
            const data = await GetUsers();
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function get_lists()
    {
        try {
            const data = await GetLists();
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function get_user(formData: formData)
    {
        try {
            const query = formData.get("user_id");
            const data = await GetUser(query);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function get_movie(formData: formData)
    {
        try {
            const query = formData.get("movie_id");
            const data = await GetMovie(query);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function get_list(formData: formData)
    {
        try {
            const query = formData.get("list_id");
            const data = await GetList(query);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    
    // UPDATE ------------------------------------------------------------------
    async function update_user(formData: formData)
    {
        try {
            const query = formData.get("user_id");
            let res  = await GetUser(query);
            res.user_name = "PoopyMcButtFace!";
            const to_update: User = new User(
                res.user_id,
                res.user_name,
                res.primary_email, 
            );
            const data = await UpdateUser(to_update);    
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function update_movie(formData: formData)
    {
        try {
            const query = formData.get("movie_id");
            const data = await GetMovie(query);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function update_list(formData: formData)
    {
        try {
            const query = formData.get("list_id");
            const data = await GetList(query);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    // DELETE ------------------------------------------------------------------
    // CREATE ------------------------------------------------------------------
/*
        try {
        }
        catch(err: Error) {
            console.error(err);
        }
*/
    
    return(
        <div className="app-container">
            <Header/>
            {isLoggedIn ? 
                <div/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
            }
            <button type="button" onClick={get_movies}>Get Movies</button>
            <button type="button" onClick={get_users}>Get Users</button>
            <button type="button" onClick={get_lists}>Get Lists</button>
            <br/>
            <form action={get_user}>
                <input name="user_id"/>
                <button type="submit">GetUser</button>
            </form>
            <form action={get_movie}>
                <input name="movie_id"/>
                <button type="submit">GetMovie</button>
            </form>
            <form action={get_list}>
                <input name="list_id"/>
                <button type="submit">GetList</button>
            </form>

    
            <form action={update_user}>
                <input name="user_id"/>
                <button type="submit">UpdateUser</button>
            </form>
            <form action={update_movie}>
                <input name="movie_id"/>
                <button type="submit">UpdateMovie</button>
            </form>
            <form action={update_list}>
                <input name="list_id"/>
                <button type="submit">UpdateList</button>
            </form>
        </div>
    )
}

export default App;

