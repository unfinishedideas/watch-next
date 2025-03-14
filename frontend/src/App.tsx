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

import { v4 as uuidv4 } from 'uuid';


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
    async function delete_user(formData: formData)
    {
        try {
            const query = formData.get("user_id");
            await DeleteUser(query);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function delete_movie(formData: formData)
    {
        try {
            const query = formData.get("movie_id");
            await DeleteMovie(query);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    async function delete_list(formData: formData)
    {
        try {
            const query = formData.get("list_id");
            await DeleteList(query);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    // CREATE ------------------------------------------------------------------
    async function create_user(formData: formData)
    {
        try {
            const username = formData.get("username");
            const id = uuidv4();
            console.log(id)
            const newUser = new User(id, username, "Cheap@Fuckit.com");
            const data = await CreateUser(newUser);
            console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    function create_movie(formData: formData)
    {
        try {
            const title = formData.get("movie_title");
            //console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    function create_list(formData: formData)
    {
        try {
            const title = formData.get("list_title");
            //console.log(data);
        }
        catch(err: Error) {
            console.error(err);
        }
    }
    
    return(
        <div className="app-container">
            <Header/>
            {isLoggedIn ? 
                <div/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
            }

            <br/><br/>
            <button type="button" onClick={get_users}>Get Users</button>
            <br/>
            <button type="button" onClick={get_movies}>Get Movies</button>
            <br/>
            <button type="button" onClick={get_lists}>Get Lists</button>
            <br/><br/>

            <form action={get_user}>
                <input name="user_id"/>
                <button type="submit">GetUser</button>
            </form>
            <form action={update_user}>
                <input name="user_id"/>
                <button type="submit">UpdateUser</button>
            </form>
            <form action={delete_user}>
                <input name="user_id"/>
                <button type="submit">DeleteUser</button>
            </form>
            <form action={create_user}>
                <input name="username"/>
                <button type="submit">CreateUser</button>
            </form>
            <br/>

            <form action={get_movie}>
                <input name="movie_id"/>
                <button type="submit">GetMovie</button>
            </form>
            <form action={update_movie}>
                <input name="movie_id"/>
                <button type="submit">UpdateMovie</button>
            </form>
            <form action={delete_movie}>
                <input name="movie_id"/>
                <button type="submit">DeleteMovie</button>
            </form>
            <form action={create_movie}>
                <input name="movie_title"/>
                <button type="submit">CreateMovie</button>
            </form>
            <br/>

            <form action={get_list}>
                <input name="list_id"/>
                <button type="submit">GetList</button>
            </form>
            <form action={create_list}>
                <input name="list_title"/>
                <button type="submit">CreateList</button>
            </form>
            <form action={update_list}>
                <input name="list_id"/>
                <button type="submit">UpdateList</button>
            </form>
            <form action={delete_list}>
                <input name="list_id"/>
                <button type="submit">DeleteList</button>
            </form>

        </div>
    )
}

export default App;

