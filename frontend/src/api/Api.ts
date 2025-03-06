import Movie from '../classes/Movie.ts'
import User from '../classes/User.ts'
import List from '../classes/List.ts'

export default class API
{
    base_url = "http://localhost:5025"

    // movies
    async GetMovies(): Movie[]
    {
        const res = await fetch(`${this.base_url}/movies`)
        .then(data => data.json())

        let result:Movie[] = [];
        res.forEach((movie) => { 
            result.push(new Movie(movie.title, movie.year, movie.director, movie.rating, movie.movieId));
        });
        return result;
    }
    async GetMovie(id:string)
    {
    }
    async CreateMovie(to_add:Movie)
    {
    }
    async UpdateMovie(to_update:Movie)
    {
    }
    async DeleteMovie(id:string)
    {
    }
    // users
    async GetUsers() : User[]
    {
        const res = await fetch(`${this.base_url}/users`)
        .then(data => data.json())

        let result:User[] = [];
        res.forEach((user) => { 
            result.push(new User(user.username, user.userId, user.primaryEmail));
        });
        return result;
    }
    async GetUser(id:string)
    {
    }
    async CreateUser(to_add:Movie)
    {
    }
    async UpdateUser(to_update:Movie)
    {
    }
    async DeleteUser(id:string)
    {
    }
    // lists
    async GetLists() : List[]
    {
        const res = await fetch(`${this.base_url}/lists`)
        .then(data => data.json())

        let result:List[] = [];
        res.forEach((list) => { 
            // populate the movies and users first
            let listMovies:Movie[] = [];
            list.movies.forEach((movie) =>
            {
                listMovies.push(new Movie(movie.title, movie.year, movie.director, movie.rating, movie.movieId));
            });

            let listUsers:User[] = [];
            list.createdBy.forEach((user) =>
            {
                listUsers.push(new User(user.username, user.userId, user.primaryEmail));
            });

            result.push(new List(list.title, listUsers, listMovies));
        });
        console.log(result);
        return result;
    }
    async GetList(id:string)
    {
    }
    async CreateList(to_add:Movie)
    {
    }
    async UpdateList(to_update:Movie)
    {
    }
    async DeleteList(id:string)
    {
    }
}
