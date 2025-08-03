import './UserSignupForm.css'
import UserContext from '../context/UserContext.ts' 
import { useContext, useState } from 'react'
import { RegisterUser } from '../api/UserApi.ts'
import {UserRegister, User} from '../classes/User.ts'

interface UserSignupFormProps {
}

const UserSignupForm: React.FC<LoginFormProps> = () =>
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
    const [user, setUser] = useContext(UserContext);
    const [errMsg, setErrMsg] = useState("");
    const [formData, setFormData] = useState({
        emailInput: '',
        usernameInput: '',
        passwordInput: '',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function AttemptUserRegistration(event)
    {
        event.preventDefault();
        setErrMsg("");
        try {
            CheckEmailValidity(formData.emailInput);
            CheckUsernameValidity(formData.usernameInput);
            CheckPasswordValidity(formData.passwordInput);
            const newUser :User = new UserRegister(formData.usernameInput, formData.emailInput, formData.passwordInput);
            let loggedInUser = await RegisterUser(newUser);
            if (loggedInUser != null)
            {
                setUser(loggedInUser);
            }
            setFormState(FormStatus.Success);
        }
        catch(err: Error) {
            if (err.message === "email already registered") {
                setErrMsg("Error: email already registered");
            }
            else if (err.message === "username already registered") {
                setErrMsg("Error: username already registered");
            }
            else {
                setErrMsg("Something went wrong, please try again");
            }
            console.log(err.message);
        }
    }

    function CheckEmailValidity(email: string)
    {
        if (!emailRegex.test(email)) {
            setErrMsg("Invalid email");
            throw new Error("Invalid email");
        }
    }

    function CheckUsernameValidity(username: string)
    {
        if (username.length <= 3 || whitespaceRegex.test(username)) {
            setErrMsg("Invalid username");
            throw new Error("Invalid username");
        }
    }

    function CheckPasswordValidity(password: string)
    {
        if (password.length <= 3 || whitespaceRegex.test(password)) {
            setErrMsg("Invalid password");
            throw new Error("Invalid password");
        }
    }

    if (formState === FormStatus.Success) {
        return(<p>User successfully registered, log in and start sharing movies!</p>)
    }
    else {
        return(
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={AttemptUserRegistration}>
                    <label>Email:</label>
                    <input
                        type="text"
                        id="emailInput"
                        name="emailInput"
                        value={formData.emailInput}
                        onChange={handleChange}
                        required
                    />
                    <label>Username:</label>
                    <input 
                        type="text"
                        id="usernameInput"
                        name="usernameInput"
                        value={formData.usernameInput}
                        onChange={handleChange}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="text"
                        id="passwordInput"
                        name="passwordInput"
                        value={formData.passwordInput}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register User</button>
                </form>
                {errMsg ?? <p>{errMsg}</p>}
            </div>
        )
    }
}

export default UserSignupForm;
