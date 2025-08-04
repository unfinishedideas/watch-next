import './Screen.css'
import UserSignupForm from '../components/UserSignupForm.tsx'

interface SignUpScreenProps {
}

const SignUpScreen: React.FC<SignUpScreenProps> = () =>
{
    return(
        <div className="screen-container">
            <UserSignupForm/>
        </div>
    )
}

export default SignUpScreen;

