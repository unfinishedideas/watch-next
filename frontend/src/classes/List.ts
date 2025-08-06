export default class List {
  id: string;
  list_title: NonNullable<string>;
  owner_ids: string[];
  movie_ids: string[];
  creator_id: NonNullable<string>;

  constructor(
    list_id: string,
    list_title: string = "",
    owner_ids: string[] = [],
    movie_ids: string[] = [],
    creator_id: string
  ) {
    this.id = list_id;
    this.list_title = list_title;
    this.owner_ids = owner_ids;
    this.movie_ids = movie_ids;
    this.creator_id = creator_id;
  }
}
