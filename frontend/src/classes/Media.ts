export default class Media
{
    id: string;
    title: string;
    release_date: Date;
    director: string;
    genre: string;
    created_at: Date;

    constructor(data: {id:string, title:string, release_date:Date, director:string, genre:string, created_at:Date}) {
        this.id = data.id;
        this.title = data.title;
        this.release_date = data.release_date;
        this.director = data.director;
        this.genre = data.genre;
        this.created_at = data.created_at;
    }
}

export interface MediaData {
    id: string;
    title: string;
    release_date: Date;
    director: string;
    genre: string;
    created_at: Date;
}