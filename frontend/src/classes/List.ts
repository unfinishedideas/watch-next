import User from './User.ts'
import Movie from './Movie.ts'

export default class List
{
    title: NonNullable<string>;
    userIds: string[];
    movieIds: string[];

    constructor(title :string = "", userIds :string[] = [], movieIds :string[] = [])
    {
        this.title = title;
        this.createdBy = createdBy;
        this.movies = movies;
    }
}
