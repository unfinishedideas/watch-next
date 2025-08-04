import './Header.css'
import UserContext from '../context/UserContext.ts' 
import { useContext } from 'react'
import { NavLink } from 'react-router'

function HeaderUserPanel()
{
    const [user, setUser] = useContext(UserContext);

    function LogOutUser() {
        setUser(null); 
    }

    if (user === null) {
        return(
            <div className="header-userpanel">
                <NavLink className="nav-link" to="home">Home</NavLink>
                <NavLink className="nav-link" to="login">Log In</NavLink>
                <NavLink className="nav-link" to="signup">Sign Up</NavLink>
            </div>
        )
    }
    else {
        return(
            <div className="header-userpanel">
                <NavLink className="nav-link" to="settings">{user.username}</NavLink>
                <NavLink className="nav-link" to="home">Home</NavLink>
                <NavLink className="nav-link" to="home" onClick={LogOutUser}>Sign Out</NavLink>
            </div>
        )
    }
}

export default HeaderUserPanel;
