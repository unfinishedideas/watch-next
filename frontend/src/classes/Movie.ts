export default class Movie
{
    movieId: string;
    title: string;
    year: number;
    director: string;
    rating: number;

    constructor(title:string = "", year:number = 0, director:string = "", rating:number = 0.0, movieId:string = "")
    {
        this.title = title;
        this.year = year;
        this.director = director;
        this.rating = rating;
        this.movieId = movieId;
    }
}

