import User from './User.ts'
import Movie from './Movie.ts'

export default class List
{
    title: NonNullable<string>;
    createdBy: NonNullable<User>;
    movies: Movie[];

    constructor(title :string = "", createdBy :User[] = [], movies :Movie[] = [])
    {
        this.title = title;
        this.createdBy = createdBy;
        this.movies = movies;
    }
}
