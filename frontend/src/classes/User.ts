export default class User
{
    user_id: string;
    username: string;
    email: string;
    deleted: bool; 

    constructor(user_id:string="", username:string="", email:string="", deleted:boolean=false) 
    {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.deleted = deleted; 
    }
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
