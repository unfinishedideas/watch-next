export default class WatchList {
  id: string;
  title: string;
  created_at: Date;
  is_private: boolean;

  constructor(data: {
    id: string;
    title: string;
    created_at: Date;
    is_private: boolean;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.created_at = data.created_at;
    this.is_private = data.is_private;
  }
}

export interface WatchListData {
  id: string;
  title: string;
  created_at: Date;
  is_private: boolean;
}
