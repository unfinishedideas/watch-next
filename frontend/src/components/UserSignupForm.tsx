import './Form.css'
import UserContext from '../context/UserContext.ts' 
import { useContext, useState } from 'react'
import { RegisterUser } from '../api/UserApi.ts'
import { UserRegister, User } from '../classes/User.ts'
import FormErrorMessage from './FormErrorMessage.tsx'

interface UserSignupFormProps {
}

const UserSignupForm: React.FC<UserSignupFormProps> = () =>
{
    const whitespaceRegex = /\s/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // TODO: Create regex for passwords and usernames to prevent bad characters
    // TODO: Change to an onSubmit form with event.preventDefault() to prevent wiping the data each attempt
    //
    const [user, setUser] = useContext(UserContext);
    
    enum FormStatus
    {
        FormAwaitingInput,
        FormError,
        FormSuccess
    }
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [formState, setFormState] = useState<FormStatus>(FormStatus.FormAwaitingInput);
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
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setErrMsg("");
        try {
            let emailValid = CheckEmailValidity(formData.emailInput);
            let usernameValid = CheckUsernameValidity(formData.usernameInput);
            let passwordValid = CheckPasswordValidity(formData.passwordInput);
            if (!emailValid || !usernameValid || !passwordValid) {
                return;
            }
            const newUser :User = new UserRegister(formData.usernameInput, formData.emailInput, formData.passwordInput);
            let loggedInUser = await RegisterUser(newUser);
            if (loggedInUser != null)
            {
                setUser(loggedInUser);
            }
            setFormState(FormStatus.Success);
        }
        catch(err: Error) {
            switch(err.message)
            {
                case "email already registered":
                    setEmailError("Email already registered");
                    break;
                case "username already registered":
                    setUsernameError("Username already registered");
                    break;
                default:
                    setErrMsg("Something went wrong, please try again");
            }
        }
    }

    function CheckEmailValidity(email: string) :boolean
    {
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid Email address");
            return false;
        }
        return true;
    }

    function CheckUsernameValidity(username: string) :boolean
    {
        if (username.length <= 3 || whitespaceRegex.test(username)) {
            setUsernameError("Please enter a valid Username");
            return false;
        }
        return true;
    }

    function CheckPasswordValidity(password: string) :boolean
    {
        if (password.length <= 3 || whitespaceRegex.test(password)) {
            setPasswordError("Please enter a valid password");
            return false;
        }
        return true;
    }

    if (formState === FormStatus.Success) {
        return(<p>User successfully registered, log in and start sharing movies!</p>)
    }
    else {
        return(
            <div className="form-container">
                <h2 className="form-title">Sign Up</h2>
                <form className="form-style" onSubmit={AttemptUserRegistration}>
                    <div className="field-container">
                        <label className="signup-label">Email</label>
                        <br/>
                        <input
                            className="text-input"
                            type="text"
                            id="emailInput"
                            name="emailInput"
                            placeholder="Email"
                            value={formData.emailInput}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                        <FormErrorMessage message={emailError}/>
                    </div>

                    <div className="field-container">
                        <label className="signup-label">Password </label>
                        <br/>
                        <input
                            className="text-input"
                            type="password"
                            id="passwordInput"
                            name="passwordInput"
                            placeholder="Password"
                            value={formData.passwordInput}
                            onChange={handleChange}
                            required
                        />
                        <FormErrorMessage message={passwordError}/>
                        <p className="hint-text">Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
                    </div>

                    <div className="field-container">
                        <label className="signup-label">Username </label>
                        <br/>
                        <input 
                            className="text-input"
                            type="text"
                            id="usernameInput"
                            name="usernameInput"
                            placeholder="Username"
                            value={formData.usernameInput}
                            onChange={handleChange}
                            required
                        />
                        <FormErrorMessage message={usernameError}/>
                        <p className="hint-text">Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.</p>
                    </div>

                    <button className="submit-btn" type="submit">Sign Up</button>
                </form>
                {errMsg ?? <p className="error-text">{errMsg}</p>}
            </div>
        )
    }
}

export default UserSignupForm;
