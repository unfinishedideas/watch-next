export default class User
{
    id: string;
    username: string;
    email: string;
    deleted: boolean; 
    created_at: Date;

    constructor(data: {id:string, username:string, email:string, deleted:boolean, created_at:Date}) 
    {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.deleted = data.deleted; 
        this.created_at = data.created_at;
    }
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  deleted: boolean;
  created_at: Date;
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
