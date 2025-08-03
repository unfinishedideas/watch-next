import './Header.css'
import UserContext from '../context/UserContext.ts' 
import { useContext } from 'react'

function HeaderUserPanel()
{
    const [user, setUser] = useContext(UserContext);

    function LogOutUser() {
        setUser(null); 
    }

    if (user === null) {
        return(
            <div/>
        )
    }
    else {
        return(
            <div className="header-userpanel">
                <p>{user.username}</p>
                <button onClick={LogOutUser}>Log Out</button>
            </div>
        )
    }
}

export default HeaderUserPanel;
