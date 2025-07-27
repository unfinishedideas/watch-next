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
    enum FormStatus
    {
        AwaitingInput,
        BadEmailInput,
        BadEmailInDb,
        BadUsernameInput,
        UsernameAlreadyInDb,
        BadPasswordInput,
        Success
    }

    const [formState, setFormState] = useState<FormStatus>(FormStatus.AwaitingInput);

    async function AttemptUserRegistration(formData)
    {
        setFormState(FormStatus.AwaitingInput);
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
        const newUser :User = new User(newId, uName, uEmail, uPass);
        try
        {
            CreateUser(newUser);
            // TODO: Actually wait to see if it worked before setting form status
            // Also, remove registration form once successful
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
            setFormState(FormStatus.BadEmailInput);
            return false;
        }
        // TODO: Check if Email already in db
        return true;
    }

    function CheckUsernameValidity(username: string) : boolean
    {
        if (username.length <= 3 || whitespaceRegex.test(username))
        {
            setFormState(FormStatus.BadUsernameInput);
            return false;
        }
        // TODO: Check if username already in the db
        return true;
    }

    function CheckPasswordValidity(password: string) : boolean
    {
        if (password.length <= 3 || whitespaceRegex.test(password))
        {
            setFormState(FormStatus.BadPasswordInput);
            return false;
        }
        // TODO: Check if username already in the db
        return true;
    }

    return(
        <div>
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
            {formState === FormStatus.BadEmailInput && <p>Email entered incorrectly. Use the form name@domain.com</p>}
            {formState === FormStatus.BadEmailInDb && <p>Email already in db! Try logging in instead.</p>}
            {formState === FormStatus.BadUsernameInput && <p>Username entered incorrectly. Usernames must not contain any special characters and must be longer than 3 characters</p>}
            {formState === FormStatus.BadUsernameAlreadyInDb && <p>Username already in db! Please choose another one</p>}
            {formState === FormStatus.BadPasswordInput && <p>Bad Password, Passwords must not contain any special characters and must be longer than 3 characters</p>}
            {formState === FormStatus.Success && <p>User successfully registered! Please Log in.</p>}
        </div>
    )
}

export default UserSignupForm;
