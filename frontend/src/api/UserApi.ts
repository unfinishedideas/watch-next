import { HandleError, base_url } from "./CommonAPI.ts";
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
const WatchListDataArraySchema = z.array(WatchListDataRawSchema);

const UserDataRawSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.email(),
  deleted: z.boolean(),
  created_at: z.iso.datetime(), // Expecting an ISO date string
});
//const UserDataArraySchema = z.array(UserDataRawSchema);



export async function LoginUser(
  nameInput: string,
  pass: string
): Promise<UserData> {
  const res = await fetch(`${base_url}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: nameInput, password: pass }),
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("incorrect password");
    } else if (res.status === 404) {
      throw new Error("user not found");
    } else if (res.status === 400) {
      throw new Error("user is deleted");
    } else {
      const text = await res.text();
      const cleanTxt = text.replace(/^"|"$/g, "").trim().toLowerCase();
      throw new Error(cleanTxt);
    }
  }
  const rawData = UserDataRawSchema.parse(await res.json());
  return {
    ...rawData,
    created_at: new Date(rawData.created_at),
  };
}

export async function RegisterUser(
  email: string,
  pass: string,
  username: string
): Promise<UserData> {
  const res = await fetch(`${base_url}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: pass, username: username }),
  });
  if (!res.ok) {
    const text = await res.text();
    const cleanTxt = text.replace(/^"|"$/g, "").trim().toLowerCase();
    if (res.status === 400) {
      throw new Error(cleanTxt);
    } else {
      HandleError(res);
    }
  }
  const rawData = UserDataRawSchema.parse(await res.json());
  return {
    ...rawData,
    created_at: new Date(rawData.created_at),
  };
}

export async function GetUserLists(user_id: string): Promise<WatchListData[]> {
  const res = await fetch(`${base_url}/users/${user_id}/watch-lists`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("GetUserLists: User not found");
    } else {
      HandleError(res);
    }
  }
  const rawData = WatchListDataArraySchema.parse(await res.json());
  return rawData.map((item) => ({
    id: item.id,
    title: item.title,
    created_at: new Date(item.created_at),
    is_private: item.is_private,
  }));
}
