export default class Movie
{
    id: string;
    movie_title: string;
    imdb_id: string;
    year: number;
    director: string;
    rating: number;

    constructor(id: string="", movie_title:string = "", year:number = 0, 
                director:string = "", rating:number = 0.0, imdb_id:string = "")
    {
        this.id = id;
        this.movie_title = movie_title;
        this.year = year;
        this.director = director;
        this.rating = rating;
        this.imdb_id = imdb_id;
    }
}

