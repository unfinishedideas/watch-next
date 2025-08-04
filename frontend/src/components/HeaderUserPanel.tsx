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
                <NavLink className="nav-link" to="home">home</NavLink>
                <NavLink className="nav-link" to="login">log in</NavLink>
                <NavLink className="nav-link" to="signup">sign up</NavLink>
            </div>
        )
    }
    else {
        return(
            <div className="header-userpanel">
                <NavLink className="nav-link" to="settings">{user.username}</NavLink>
                <NavLink className="nav-link" to="home">home</NavLink>
                <NavLink className="nav-link" to="home" onClick={LogOutUser}>sign out</NavLink>
            </div>
        )
    }
}

export default HeaderUserPanel;
