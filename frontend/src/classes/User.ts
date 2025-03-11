export default class User
{
    user_name: string;
    user_id: string;
    primary_email: string;

    constructor(user_name:string="", user_id:string="",primary_email:string="")
    {
        this.user_name = user_name;
        this.user_id = user_id;
        this.primary_email = primary_email;
    }
}
