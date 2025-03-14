import { base_url } from './Vars.ts'
import List from '../classes/List.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetList: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, err);
    }
}

export async function GetLists<T>(): Promise<T> {
    const res = await fetch(`${base_url}/lists/`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function GetList<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/lists/${id}`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function UpdateList<T>(update: List): Promise<T> {
    const res = await fetch(`${base_url}/lists/${update.list_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function DeleteList<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/lists/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function CreateList<T>(newList: List): Promise<T> {
    const res = await fetch(`${base_url}/lists/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

