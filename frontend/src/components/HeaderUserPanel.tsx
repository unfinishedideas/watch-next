import './Header.css'
import { useUser } from '../hooks/UserHooks.ts';
import { NavLink } from 'react-router'

function HeaderUserPanel()
{
    const {user, setUser} = useUser();

    function LogOutUser() {
        setUser(undefined); 
    }

    if (user === undefined) {
        return(
            <div className="header-userpanel">
                <NavLink className="nav-link" to="/">home</NavLink>
                <NavLink className="nav-link" to="login">log in</NavLink>
                <NavLink className="nav-link" to="signup">sign up</NavLink>
            </div>
        )
    }
    else {
        return(
            <div className="header-userpanel">
                <NavLink className="nav-link" to="/">home</NavLink>
                <NavLink className="nav-link" to="settings">{user.username}</NavLink>
                <NavLink className="nav-link" to="/" onClick={LogOutUser}>log out</NavLink>
            </div>
        )
    }
}

export default HeaderUserPanel;
