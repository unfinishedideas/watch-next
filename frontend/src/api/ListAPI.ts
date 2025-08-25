import { HandleError, base_url } from "./CommonAPI";
import { type UserData } from "../classes/User.ts";
import { type WatchListData } from "../classes/WatchList.ts";
import { z } from "zod";

// ZOD types for safety
const WatchListDataRawSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.iso.datetime({ offset: true }).or(z.iso.datetime()),
  is_private: z.boolean(),
});
// const WatchListDataArraySchema = z.array(WatchListDataRawSchema);

// const UserDataRawSchema = z.object({
//   id: z.string(),
//   username: z.string(),
//   email: z.email(),
//   deleted: z.boolean(),
//   created_at: z.iso.datetime(), // Expecting an ISO date string
// });
//const UserDataArraySchema = z.array(UserDataRawSchema);

export async function GetListById(id: string): Promise<WatchListData> {
  const res = await fetch(`${base_url}/watch-lists/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("List not found");
    }
    else {
        HandleError(res)
    }
  }
  const rawData = WatchListDataRawSchema.parse(await res.json());
  return {...rawData, created_at: new Date(rawData.created_at)};
}