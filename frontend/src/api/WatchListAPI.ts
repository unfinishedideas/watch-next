import {
  HandleError,
  base_url,
  WatchListDataSchema,
  WatchListContentSchema,
  WatchListPreviewSchema,
} from "./CommonAPI.ts";
import {
  type WatchListData,
  type WatchListContent,
  type WatchListPreviewContent,
} from "../classes/WatchList.ts";

// // Now when you parse:
// const rawJson = await res.json();
// const parsed = WatchListContentSchema.parse(rawJson);

export async function GetListById(id: string): Promise<WatchListData> {
  const res = await fetch(`${base_url}/watch-lists/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("List not found");
    } else {
      HandleError(res);
    }
  }
  return WatchListDataSchema.parse(await res.json());
}

export async function GetListContentById(
  id: string
): Promise<WatchListContent> {
  const res = await fetch(`${base_url}/watch-lists/${id}/all`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("GetListContentById: List not found");
    } else {
      HandleError(res);
    }
  }
  return WatchListContentSchema.parse(await res.json());
}

export async function GetListPreviewContentById(
  id: string,
  limit: number
): Promise<WatchListPreviewContent> {
  const res = await fetch(
    `${base_url}/watch-lists/${id}/preview?limit=${limit}`
  );
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("GetListPreviewContentById: List not found");
    } else {
      HandleError(res);
    }
  }
  return WatchListPreviewSchema.parse(await res.json());
}
