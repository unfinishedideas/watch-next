import LoginForm from '../components/LoginForm.tsx'
import UserSignupForm from '../components/UserSignupForm.tsx'

interface LoginScreenProps {
    setIsLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({setIsLoggedIn} : LoginScreenProps) =>
{
    return(
        <div>
            <h2>Login</h2>
            <br/>
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
            <br/>
            <h2>Sign Up</h2>
            <UserSignupForm setIsLoggedIn={setIsLoggedIn}/>
            <br/>
        </div>
    )
}

export default LoginScreen;

