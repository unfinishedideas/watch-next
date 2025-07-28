import LoginForm from '../components/LoginForm.tsx'
import UserSignupForm from '../components/UserSignupForm.tsx'

interface LoginScreenProps {
    setIsLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({setIsLoggedIn} : LoginScreenProps) =>
{
    return(
        <div>
            <LoginForm/>
            <br/>
            <UserSignupForm/>
            <br/>
        </div>
    )
}

export default LoginScreen;

