export default class User
{
    user_name: string;
    user_id: string;
    primary_email: string;
    deleted: bool;

    constructor(user_id:string="", user_name:string="", primary_email:string="")
    {
        this.user_id = user_id;
        this.user_name = user_name;
        this.primary_email = primary_email;
        this.deleted = false;
    }
}
