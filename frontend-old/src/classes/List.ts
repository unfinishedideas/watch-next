export default class List {
  id: string;
  title: NonNullable<string>;
  //owner_ids: string[];
  //movie_ids: string[];
  //creator_id: NonNullable<string>;

  constructor(
    id: string,
    title: string = "",
    //owner_ids: string[] = [],
    //movie_ids: string[] = [],
    creator_id: string
  ) {
    this.id = id;
    this.title = title;
    this.owner_ids = owner_ids;
    this.movie_ids = movie_ids;
    this.creator_id = creator_id;
  }
}
