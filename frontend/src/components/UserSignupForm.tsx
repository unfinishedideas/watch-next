import './UserSignupForm.css'
import { useState } from 'react'
import { CreateUser } from '../api/UserApi.ts'
import { v4 as uuidv4 } from 'uuid';
import User from '../classes/User.ts'

interface UserSignupFormProps {
    setIsLoggedIn: () => void;
}

const UserSignupForm: React.FC<LoginFormProps> = ({setIsLoggedIn} : UserSignupFormProps) =>
{
    const whitespaceRegex = /\s/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // TODO: Create regex for passwords and usernames to prevent bad characters
    // TODO: Change to an onSubmit form with event.preventDefault() to prevent wiping the data each attempt
    
    enum FormStatus
    {
        FormAwaitingInput,
        FormError,
        FormSuccess
    }

    const [formState, setFormState] = useState<FormStatus>(FormStatus.FormAwaitingInput);
    const [errMsg, setErrMsg] = useState("");

    async function AttemptUserRegistration(formData)
    {
        setFormState(FormStatus.FormAwaitingInput);
        const uEmail = formData.get("emailInput");
        const uName = formData.get("usernameInput");
        const uPass = formData.get("passwordInput");

        if (!CheckEmailValidity(uEmail) || 
            !CheckUsernameValidity(uName) || 
            !CheckPasswordValidity(uPass)
        )
        {
            return;
        }
        // Attempt registration
        const newId = uuidv4();
        const newUser :User = new User(newId, uName, uEmail, false);
        try
        {
            CreateUser(newUser, uPass);
            // TODO: Actually wait to see if it worked before setting form status, possibly log in too?
            setFormState(FormStatus.Success);
        }
        catch(err: Error)
        {
            console.error(err);
        }
    }

    function CheckEmailValidity(email: string) : boolean
    {
        if (!emailRegex.test(email))
        {
            setErrMsg("Invalid email");
            return false;
        }
        // TODO: Check if Email already in db
        return true;
    }

    function CheckUsernameValidity(username: string) : boolean
    {
        if (username.length <= 3 || whitespaceRegex.test(username))
        {
            setErrMsg("Invalid username");
            return false;
        }
        // TODO: Check if username already in the db
        return true;
    }

    function CheckPasswordValidity(password: string) : boolean
    {
        if (password.length <= 3 || whitespaceRegex.test(password))
        {
            setErrMsg("Invalid password");
            return false;
        }
        // TODO: Check if username already in the db
        return true;
    }

    if (formState === FormStatus.Success)
    {
        return(<p>User successfully registered, log in and start sharing movies!</p>)
    }
    else
    {
        return(
            <div>
                <h2>Sign Up</h2>
                <form action={AttemptUserRegistration}>
                    <label>
                        Email: <input name="emailInput"/>
                    </label>
                    <br/>
                    <label>
                        Username: <input name="usernameInput"/>
                    </label>
                    <br/>
                    <label>
                        Password: <input name="passwordInput"/>
                    </label>
                    <br/>
                    <button type="submit">Register</button>
                </form>
                {errMsg ?? <p>{errMsg}</p>}
            </div>
        )
    }
}

export default UserSignupForm;
