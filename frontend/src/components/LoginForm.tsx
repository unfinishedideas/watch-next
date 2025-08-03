import './LoginForm.css'
import UserContext from '../context/UserContext.ts' 
import { useContext, useState } from 'react'
import { LoginUser } from '../api/UserApi.ts'
import User from '../classes/User.ts'

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = () =>
{
    const [user, setUser] = useContext(UserContext);
    const [errMsg, setErrMsg] = useState("");
    const [formData, setFormData] = useState({
        nameInput: '',
        password: '',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function AttemptLogin(event)
    {
        event.preventDefault();
        try
        {
            let res = await LoginUser(formData.nameInput, formData.password);
            const loggedInUser: User = new User(res.id, res.username, res.email, res.deleted);
            setUser(loggedInUser);
        }
        catch(err: Error)
        {
            if (err.message === "user not found") {
                setErrMsg("User not found");
            }
            else if (err.message === "incorrect password") {
                setErrMsg("Incorrect password");
            }
            else if (err.message === "user is deleted") {
                setErrMsg("Cannot log in, user is deleted");
            }
            else
            {
                setErrMsg("Something went wrong, please try again.");
            }
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={AttemptLogin}>
                <label>Username or Email:</label>
                <input 
                    type="text"
                    id="nameInput"
                    name="nameInput"
                    value={formData.nameInput}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label>
                    Password:
                </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br/>
                <button type="submit">Login</button>
            </form>
            {errMsg && <p>{errMsg}</p>}
        </div>
    )
}

export default LoginForm;

