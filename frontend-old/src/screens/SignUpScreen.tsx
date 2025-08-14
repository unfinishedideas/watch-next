import './Screen.css'
import UserSignupForm from '../components/UserSignUpForm.tsx'

const SignUpScreen: React.FC = () =>
{
    return(
        <div className="screen-container">
            <UserSignupForm/>
        </div>
    )
}

export default SignUpScreen;

