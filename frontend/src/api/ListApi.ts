import { base_url } from './Vars.ts'
import List from '../classes/List.ts'

function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetList: Error`, err.message);
    } else {
        console.error(`An unknown error occurred`, error);
    }
}

export async function GetLists<T>(): Promise<T> {
    const res = await fetch(`${base_url}/lists/`);
    if (!res.ok)
    {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function GetList<T>(id: string): Promise<T> {
    const res = await fetch(`${base_url}/lists/${id}`);
    if (!res.ok)
    {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export const CreateList = (to_add: List) => {
    fetch(`${base_url}/lists/${to_add.list_id}`, {
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

export const UpdateList = (update: List) => {
    fetch(`${base_url}/lists/${update.list_id}`, {
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

export const DeleteList = (to_delete: List) => {

    fetch(`${base_url}/lists/${to_delete.list_id}`, {
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
