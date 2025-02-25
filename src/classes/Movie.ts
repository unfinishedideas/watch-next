export default class Movie
{
    title: string;
    year: number;
    director: string;
    rating: number;

    constructor(title = "", year = 0, director = "", rating = 0.0)
    {
        this.title = title;
        this.year = year;
        this.director = director;
        this. rating = rating;
    }
}

