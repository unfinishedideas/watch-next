import { type UserData } from "../classes/User.ts";
import { type WatchListData } from "../classes/WatchList.ts";

const base_url: string = import.meta.env.VITE_API_BASE_URL;

function HandleError(err: unknown) {
  console.error(err);
}

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
  const data = await res.json();
  return {
    ...data,
    created_at: new Date(data.created_at),
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
  const data = await res.json();
  return {
    ...data,
    created_at: new Date(data.created_at),
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
  const rawData: any[] = await res.json();

  return rawData.map(
    (item): WatchListData => ({
      id: String(item.id),
      title: String(item.title),
      created_at: new Date(item.created_at),
      is_private: Boolean(item.is_private),
    })
  );
}
