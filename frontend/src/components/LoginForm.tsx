import './LoginForm.css'
import UserContext from '../context/UserContext.ts' 
import { useContext } from 'react'

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = () =>
{
    const [user, setUser] = useContext(UserContext);

    function AttemptLogin(event)
    {
        // TODO: Actual user login :P
        setUser(1);
    }

    return(
        <div>
            <form action={AttemptLogin}>
                <label>
                    Username or Email: <input name="usernameInput"/>
                </label>
                <br/>
                <label>
                    Password: <input name="passwordInput"/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;

