export default class Movie
{
    id: string;
    title: string;
    genre: string;
    year: number;
    director: string;
    //rating: number;
    //imdb_tag: string;
    release_date: Date;
    created_at: Date;
    movie_order: number;

    constructor(id: string="", title:string = "", year:number = 0, 
                director:string = "", genre:string = "", release_date:Date, created_at:Date, movie_order:number)
               //rating:number = 0.0, imdb_tag: string = ""
    {
        this.id = id;
        this.title = title;
        this.year = year;
        this.director = director;
        //this.rating = rating;
        //this.imdb_tag = imdb_tag;
        this.genre = genre;
        this.release_date = new Date(release_date);
        this.created_at = created_at;
        this.movie_order = movie_order;
    }
}
