import { base_url } from './Vars.ts'
import List from '../classes/List.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`ListAPI: Error`, err.message);
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
    const res = await fetch(`${base_url}/lists/`, {
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
    return res as T;
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

export async function RemoveMovieFromList<T>(query: object): Promise<T>{
    try
    {
        const list: List = query.list;
        const movie_id: string = query.id;
        list.movie_ids = list.movie_ids.filter(id => id != movie_id);
        return await UpdateList(list); 
    }
    catch(err: Error)
    {
        HandleError(err);
    }
}

export async function GetMovieListMovies<T>(id: string): Promise<T>{
    try {
        const res = await fetch(`${base_url}/watch-lists/${id}/movies`, {
            method: "GET",
        });
        if (!res.ok) {
            HandleError(res.statusText);
        }
        return await res.json() as T;
    }
    catch (err: Error) {
        HandleError(err);
    }
}

export async function GetMovieListUsers<T>(id: string): Promise<T>{
    try {
        const res = await fetch(`${base_url}/watch-lists/${id}/users`, {
            method: "GET",
        });
        if (!res.ok) {
            HandleError(res.statusText);
        }
        return await res.json() as T;
    }
    catch (err: Error) {
        HandleError(err);
    }
}

export type AsyncApiFunc = (id: string) => Promise;
