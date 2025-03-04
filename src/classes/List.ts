import User from './User.ts'
import Movie from './Movie.ts'

export default class List
{
    title: string;
    createdBy: User;
    movies: Movie[];

    constructor(title:string = "", createdBy:User[] = null, movies:Movie[] = null)
    {
        this.title = title;
        this.createdBy = createdBy;
        this.movies = movies;
    }
}
