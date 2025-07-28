import { base_url } from './Vars.ts';
import User from '../classes/User.ts';


function HandleError(err: unknown)
{
    if (err instanceof Error) {
        console.log(`GetUser: Error`, err.message);
    } else {
        console.error(`An internal server error occurred: `, err);
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
    const res = await fetch(`${base_url}/users/`, {
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
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return res as T;
}

export async function CreateUser<T>(newUser: User, pass: string): Promise<T> {
    let req = {user: newUser, password: pass}
    const res = await fetch(`${base_url}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
    });
    if (!res.ok) {
        HandleError(res.statusText);
    }
    return await res.json() as T;
}

export async function LoginUser<T>(nameInput: string, pass: string): Promise<T> {
    const res = await fetch(`${base_url}/users/login?`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: nameInput, password: pass})
    });
    if (!res.ok) {
        const text = await res.text();
        if (text.includes("User not found")){
            throw new Error("user not found");
        }
        else if (text.includes("Password is incorrect")) {
            throw new Error("password incorrect");
        }
        else
        {
            HandleError(res.status);
        }
    }
    return await res.json() as T;
}


/*
export async function LoginUser<T>(password_attempt: string): Promise<T> {
    const res = await fetch(`${base_url}/users/${

    // Load hash from your password DB.
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
    });
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
        // result == false
    });
    }
*/
