export default class Movie
{
    movie_id: string;
    movie_title: string;
    imdb_id: string;
    year: number;
    director: string;
    rating: number;

    constructor(movie_id: string="", movie_title:string = "", year:number = 0, director:string = "", rating:number = 0.0, imdb_id:string = "")
    {
        this.movie_title = movie_title;
        this.year = year;
        this.director = director;
        this.rating = rating;
        this.movie_id = movie_id;
        this.imdb_id = imdb_id;
    }
}

