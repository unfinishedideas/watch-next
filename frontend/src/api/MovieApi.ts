import { base_url } from './Vars.ts'
import Movie from '../classes/Movie.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetMovie: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, error);
    }
}

export const GetMovies = async () => {
    return await fetch(`${base_url}/movies/`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status:`, response.status);
        }
        else {
            return response.json();
        }
    })
    .catch((err: unknown) => {HandleError(err)});
};

export const GetMovie = (id: string) => {
    fetch(`${base_url}/movies/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status:`, response.status);
        } else {
            return response.json();
        }
    })
    .catch((err: unknown) => {HandleError(err)});

};

export const CreateMovie = (to_add: Movie) => {
    fetch(`${base_url}/movies/${to_add.movie_id}`, {
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

export const UpdateMovie = (update: Movie) => {
    fetch(`${base_url}/movies/${update.movie_id}`, {
            method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(update)
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

export const DeleteMovie = (to_delete: Movie) => {

    fetch(`${base_url}/movies/${to_delete.movie_id}`, {
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
