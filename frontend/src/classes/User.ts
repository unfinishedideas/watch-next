export default class User
{
    id: string;
    username: string;
    email: string;
    deleted: boolean; 

    constructor(id:string="", username:string="", email:string="", deleted:boolean=false) 
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.deleted = deleted; 
    }
}

export interface UserContextType {
    user: User | undefined;
    setUser: (user:User | undefined) => void;
}

export class UserRegister
{
    username: string;
    email: string;
    password: string;

    constructor(username:string="", email:string="", password:string="")
    {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
