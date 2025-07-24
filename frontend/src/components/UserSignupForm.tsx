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
        // Possible Errors - Bad Email
        const uEmail = formData.get("emailInput");
        if (!CheckEmailValidity(uEmail))
        {
            setFormState(FormStatus.BadEmailInput);
            return;
        }
        // TODO: Email Already Exists
        // TODO: Bad Username Input
        // TODO: Username already exists
        // TODO: BadPasswordInput

        // Attempt registration
        const newId = uuidv4();
        const uName = formData.get("usernameInput");
        const uPass = formData.get("passwordInput");
        const newUser :User = new User(newId, uName, uEmail, uPass);
        try
        {
            CreateUser(newUser);
        }
        catch(err: Error)
        {
            console.error(err);
        }
    }

    function CheckEmailValidity(email: string) : boolean
    {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
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
            {formState === FormStatus.BadEmailInput && <p>Email entered incorrectly!</p>}
            {formState === FormStatus.BadEmailInDb && <p>Email already in db! Try logging in instead.</p>}
            {formState === FormStatus.BadUsernameInput && <p>Username entered incorrectly!</p>}
            {formState === FormStatus.BadUsernameAlreadyInDb && <p>Username already in db! Please choose another one</p>}
            {formState === FormStatus.BadPasswordInput && <p>Bad Password, please include blah blah blah blah</p>}
            {formState === FormStatus.Success && <p>User successfully registered! Please Log in.</p>}
        </div>
    )
}

export default UserSignupForm;
