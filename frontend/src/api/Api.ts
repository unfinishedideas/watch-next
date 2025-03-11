import Movie from '../classes/Movie.ts'
import User from '../classes/User.ts'
import List from '../classes/List.ts'

export default class API
{
    base_url = "http://localhost:5025"
    async GetLists(): Promise<Movie[]>
    {
        const res = await fetch(`${this.base_url}/movies`)
        const data = await res.json();
        return data;
    }
}

/*
export default class API
{
    base_url = "http://localhost:5025"

    // movies ------------------------------------------------------------------
    async GetMovies(): Movie[]
    {
        const res = await fetch(`${this.base_url}/movies`)
        .then(data => data.json())

        const result:Movie[] = [];
        res.forEach((movie: Movie) => { 
            result.push(new Movie(
                                  movie.movie_title, 
                                  movie.year, 
                                  movie.director, 
                                  movie.rating, 
                                  movie.movie_id, 
                                  movie.imdb_tag
                        ));
        });
        return result;
    }
    async GetMovie(id:string)
    {
        const res = await fetch(`${this.base_url}/movies/${id}`)
        if (res.ok)
        {
            const data = res.json();
            const movie = new Movie(
                                    data.movie_title, 
                                    data.year, data.director, 
                                    data.rating, 
                                    data.movie_id,
                                    data.imdb_id
                            );
            return movie;
        }
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

    // users -------------------------------------------------------------------
    async GetUsers() : User[]
    {
        const res = await fetch(`${this.base_url}/users`)
        .then(data => data.json())

        const result:User[] = [];
        res.forEach((user) => { 
            result.push(new User(user.username, user.userId, user.primaryEmail));
        });
        return result;
    }
    async GetUser(id:string)
    {
        const res = await fetch(`${this.base_url}/users/${id}`)
        if (res.ok)
        {
            const data = res.json();
            const user = new User(data.user_name, data.user_id, data.primary_email);
            return user;
        }
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
    // lists -------------------------------------------------------------------
    async GetLists() : List[]
    {
        const res = await fetch(`${this.base_url}/lists`)
        .then(data => data.json())

        const result:List[] = [];
        res.forEach((list: List) => { 
            const list_to_add = this.GetList(list.list_id);
            result.push(list_to_add);
        });
        console.log(`hey these are the results of getlists: ${result}`);
        return result;
    }
    async GetList(id:string)
    {
        const res = await fetch(`${this.base_url}/lists/${id}`)
        if (res.ok)
        {
            const data = res.json();
            const list = new List(data.list_title, data.user_ids, data.movie_ids);
            return list;
        }
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
*/
