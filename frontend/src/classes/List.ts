export default class List
{
    list_title: NonNullable<string>;
    user_ids: string[];
    movie_ids: string[];

    constructor(list_title :string = "", user_ids :string[] = [], movie_ids :string[] = [])
    {
        this.list_title = list_title;
        this.user_ids = user_ids;
        this.movie_ids = movie_ids;
    }
}
