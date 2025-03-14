import { base_url } from './Vars.ts'
import User from '../classes/User.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetUser: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, err);
    }
}

export async function GetUsers<T>(): Promise<T> {
    const res = await fetch(`${base_url}/users/`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function GetUser<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/users/${id}`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function UpdateUser<T>(update: User): Promise<T> {
    const res = await fetch(`${base_url}/users/${update.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function DeleteUser<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function CreateUser<T>(newUser: User): Promise<T> {
    console.log("COME ON NOWWW");
    console.log(newUser);
    console.log(JSON.stringify(newUser));
    const res = await fetch(`${base_url}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

