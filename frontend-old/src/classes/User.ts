export default class User
{
    id: string;
    username: string;
    email: string;
    deleted: boolean; 
    created_at: Date;

    constructor(id:string="", username:string="", email:string="", deleted:boolean=false, created_at:Date) 
    {
        this.id = id;
        this.username = username;
        this.email = email;
        this.deleted = deleted; 
        this.created_at = created_at;
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
