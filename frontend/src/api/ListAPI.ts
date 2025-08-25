import { HandleError, base_url, WatchListDataRawSchema, MediaDataArraySchema } from "./CommonAPI";
import type { MediaData } from "../classes/Media.ts";
import { type WatchListData } from "../classes/WatchList.ts";

export async function GetListById(id: string): Promise<WatchListData> {
  const res = await fetch(`${base_url}/watch-lists/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("List not found");
    }
    else {
        HandleError(res);
    }
  }
  const rawData = WatchListDataRawSchema.parse(await res.json());
  return {...rawData, created_at: new Date(rawData.created_at)};
}

export async function GetListMediasById(id: string): Promise<MediaData[]> {
    const res = await fetch(`${base_url}/watch-lists/${id}/medias`);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("GetListMediasById: List not found")
        }
        else {
            HandleError(res);
        }
    }
    const rawData = MediaDataArraySchema.parse(await res.json());
    return rawData.map((item) => ({
        id: item.id,
        title: item.title,
        release_date: new Date(item.release_date),
        director: item.director,
        genre: item.genre,
        created_at: new Date(item.created_at),
    }));    
}