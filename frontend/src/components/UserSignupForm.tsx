import './UserSignupForm.css'
import { useState } from 'react'
import { CreateUser } from '../api/UserApi.ts'

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

    async function AttemptUserRegistration(event)
    {
        setFormState(FormStatus.AwaitingInput);
        console.log(event)  // TODO: Remove this
        // Possible Errors - Bad Email
        if (!CheckEmailValidity(event.emailInput))
        {
            setFormState(FormStatus.BadEmailInput);
            return;
        }
        // Email Already Exists
        // Bad Username Input
        // Username already exists
        // BadPasswordInput

        // Attempt registration
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
