import './UserSignupForm.css'
import { CreateUser } from '../api/UserApi.ts'

interface UserSignupFormProps {
    setIsLoggedIn: () => void;
}

const UserSignupForm: React.FC<LoginFormProps> = ({setIsLoggedIn} : UserSignupFormProps) =>
{
    function AttemptUserRegistration(event)
    {
        console.log(event)

        //setIsLoggedIn(true);
    }

    return(
        <div>
            <p>User Signup</p>
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
        </div>
    )
}

export default LoginForm;

