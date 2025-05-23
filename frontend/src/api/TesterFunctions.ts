// NOTE! This file is just the ported test functions I created for the API in 
// App.tsx. It should probably be removed but I want to keep it around for a little bit
// before removing it in case I need to make further tweaks to the API
// Yes... It's ugly
// Yes... It's awful
// And Yes... I'm ashamed >_>
// - P

// testing the API
import { GetMovies, GetMovie, CreateMovie, UpdateMovie, DeleteMovie } from './MovieApi.ts'
import { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser } from './UserApi.ts'
import { GetLists, GetList, CreateList, UpdateList, DeleteList } from './ListApi.ts'
import User from '../classes/User.ts'
import Movie from '../classes/Movie.ts'
import List from '../classes/List.ts'
import { v4 as uuidv4 } from 'uuid';

// GET ---------------------------------------------------------------------
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

// GET {ID} ----------------------------------------------------------------
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
            res.deleted,
        );
        await UpdateUser(to_update);    
    }
    catch(err: Error) {
        console.error(err);
    }
}
async function update_movie(formData: formData)
{
    try {
        const query = formData.get("movie_id");
        let res  = await GetMovie(query);
        res.movie_title = "DUMB STUPID MOVIE!";
        const to_update: User = new Movie(
            res.movie_id,
            res.movie_title,
            res.year,
            res.director,
            res.rating,
            res.imdb_id,
        );
        await UpdateMovie(to_update);    
    }
    catch(err: Error) {
        console.error(err);
    }
}
async function update_list(formData: formData)
{
    try {
        const query = formData.get("list_id");
        let res  = await GetList(query);
        res.list_title = "ALL YOUR LIST BELONG TO US!";
        const to_update: User = new List(
            res.list_id,
            res.list_title,
            res.owner_ids,
            res.movie_ids,
            res.creator_id,
        );

        await UpdateList(to_update);    
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
        const newUser = new User(id, username, "Cheap@Fuckit.com");
        const data = await CreateUser(newUser);
    }
    catch(err: Error) {
        console.error(err);
    }
}
async function create_movie(formData: formData)
{
    try {
        const title = formData.get("movie_title");
        const id = uuidv4();
        const imdb_tag = uuidv4();
        const newMovie = new Movie(id, title, 1979, "Just Some Gal", 4.0, imdb_tag);
        const data = await CreateMovie(newMovie);
    }
    catch(err: Error) {
        console.error(err);
    }
}
async function create_list(formData: formData)
{
    try {
        const title = formData.get("list_title");
        const id = uuidv4();
        const creator_id = uuidv4();
        const newList = new List(id, title, [uuidv4(), uuidv4(), uuidv4()], [uuidv4(), uuidv4(), uuidv4(), uuidv4()], uuidv4());
        const data = await CreateList(newList);
    }
    catch(err: Error) {
        console.error(err);
    }
}

/*
// Old TSX for testing these functions inside App.tsx
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
<form action={update_list}>
    <input name="list_id"/>
    <button type="submit">UpdateList</button>
</form>
<form action={delete_list}>
    <input name="list_id"/>
    <button type="submit">DeleteList</button>
</form>
<form action={create_list}>
    <input name="list_title"/>
    <button type="submit">CreateList</button>
</form>
*/
