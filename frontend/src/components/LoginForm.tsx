import './LoginForm.css'

interface LoginFormProps {
    setIsLoggedIn: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({setIsLoggedIn} : LoginFormProps) =>
{
    function AttemptLogin(event)
    {
        console.log(event)

        // TODO: Actual user login, for now, just setting to logged in
        setIsLoggedIn(true);
    }

    return(
        <div>
            <form action={AttemptLogin}>
                <label>
                    Username: <input name="usernameInput"/>
                </label>
                <br/>
                <label>
                    Password: <input name="passwordInput"/>
                </label>
                <br/>
                <button type="submit">Go</button>
            </form>
        </div>
    )
}

export default LoginForm;

