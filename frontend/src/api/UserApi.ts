import { base_url } from './Vars.ts'
import User from '../classes/User.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetUser: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, error);
    }
}

export async function GetUsers<T>(): Promise<T> {
    const res = await fetch(`${base_url}/users/`);
    if (!res.ok)
    {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function GetUser<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/users/${id}`);
    if (!res.ok)
    {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function UpdateUser<T>(update: User): Promise<T> {
    const res = await fetch(`${base_url}/users/${update.user_id}`, {
            method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(update)
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export const CreateUser = (to_add: User) => {
    fetch(`${base_url}/users/${to_add.user_id}`, {
            method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(update)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status:`, response.status);
        }
        else {
            return response.json();
        }
    })
    .catch((err: unknown) => {HandleError(err)});
}
export const DeleteUser = (to_delete: User) => {

    fetch(`${base_url}/users/${to_delete.user_id}`, {
            method: "DElETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(update)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status:`, response.status);
        }
        else {
            return response.json();
        }
    })
    .catch((err: unknown) => {HandleError(err)});
}
