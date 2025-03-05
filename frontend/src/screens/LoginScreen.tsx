import LoginForm from '../components/LoginForm.tsx'

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
        </div>
    )
}

export default LoginScreen;

