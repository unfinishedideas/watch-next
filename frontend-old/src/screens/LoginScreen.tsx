import LoginForm from '../components/LoginForm.tsx'
import './Screen.css'

interface LoginScreenProps {
}

const LoginScreen: React.FC<LoginScreenProps> = () =>
{
    return(
        <div className="screen-container">
            <LoginForm/>
        </div>
    )
}

export default LoginScreen;

