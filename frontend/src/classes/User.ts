export default class User
{
    user_id: string;
    user_name: string;
    primary_email: string;
    password_hash: string;
    deleted: bool;

    constructor(user_id:string="", user_name:string="", primary_email:string="", password_hash:string="")
    {
        this.user_id = user_id;
        this.user_name = user_name;
        this.primary_email = primary_email;
        this.password_hash = password_hash;
        this.deleted = false;
    }
}
