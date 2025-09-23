import { HandleError, base_url, UserDataSchema, WatchListDataArraySchema } from "./CommonAPI.ts";
import { type UserData } from "../classes/User.ts";
import { type WatchListData } from "../classes/WatchList.ts";

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
  return UserDataSchema.parse(await res.json());
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
  return UserDataSchema.parse(await res.json());
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
  return WatchListDataArraySchema.parse(await res.json());
}

export async function GetLimitedUserLists(user_id: string, limit: number): Promise<WatchListData[]> {
  const res = await fetch(`${base_url}/users/${user_id}/watch-lists?limit=${limit || 1}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("GetUserLists: User not found");
    } else {
      HandleError(res);
    }
  }
  return WatchListDataArraySchema.parse(await res.json());
}