import Movie from './Movie.ts'
import User from './User.ts'
import List from './List.ts'

export default class API
{
    base_url = "http://localhost:5025/"

    // movies
    async function GetMovies() : Movie[]
    {
        return await fetch(`${base_url}/movies`)
    }
    async function GetMovie(id:string)
    {
    }
    async function CreateMovie(to_add:Movie)
    {
    }
    async function UpdateMovie(to_update:Movie)
    {
    }
    async function DeleteMovie(id:string)
    {
    }
    // users
    async function GetUsers() : User[]
    {
    }
    async function GetUser(id:string)
    {
    }
    async function CreateUser(to_add:Movie)
    {
    }
    async function UpdateUser(to_update:Movie)
    {
    }
    async function DeleteUser(id:string)
    {
    }
    // lists
    async function GetLists() : List[]
    {
    }
    async function GetList(id:string)
    {
    }
    async function CreateList(to_add:Movie)
    {
    }
    async function UpdateList(to_update:Movie)
    {
    }
    async function DeleteList(id:string)
    {
    }
}
