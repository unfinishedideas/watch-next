import { type UserData } from '../classes/User.ts';

const base_url :string = import.meta.env.VITE_API_BASE_URL;

export async function LoginUser(nameInput: string, pass: string): Promise<UserData> {
    console.log(base_url)   // TODO: REMOVE THIS
    const res = await fetch(`${base_url}/users/login?`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: nameInput, password: pass}),
    });
    if (!res.ok) {
        if (res.status === 401){
            throw new Error("incorrect password");
        }
        else if (res.status === 404){
            throw new Error("user not found");
        }
        else if (res.status === 400){
            throw new Error("user is deleted");
        }
        else {
            const text = await res.text();
            const cleanTxt = text.replace(/^"|"$/g, "").trim().toLowerCase();
            throw new Error(cleanTxt)
        }
    }
    const data = await res.json();
    return {
        ...data,
        created_at: new Date(data.created_at),
    }
}
