import { base_url } from './Vars.ts'
import Movie from '../classes/Movie.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetMovie: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, err);
    }
}

export async function GetMovies<T>(): Promise<T> {
    const res = await fetch(`${base_url}/movies/`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function GetMovie<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/movies/${id}`);
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function UpdateMovie<T>(update: Movie): Promise<T> {
    const res = await fetch(`${base_url}/movies/${update.movie_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function DeleteMovie<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/movies/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return res as T;
}

export async function CreateMovie<T>(newMovie: Movie): Promise<T> {
    const res = await fetch(`${base_url}/movies/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

