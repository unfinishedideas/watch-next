export default class Movie
{
    title: string;
    year: number;
    director: string;
    rating: number;

    constructor(title:string = "", year:number = 0, director:string = "", rating:number = 0.0)
    {
        this.title = title;
        this.year = year;
        this.director = director;
        this. rating = rating;
    }
}

