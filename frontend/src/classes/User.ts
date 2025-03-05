export default class User
{
    username: string;
    userid: string;
    primaryEmail: string;

    constructor(username:string="", userid:string="",primaryEmail:string="")
    {
        this.username = username;
        this.userid = userid;
        this.primaryEmail = primaryEmail;
    }
}
