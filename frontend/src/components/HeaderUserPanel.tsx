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
                <Link>test</Link>
                <p>{user.username}</p>
                <button onClick={LogOutUser}>Log Out</button>
            </div>
        )
    }
}

export default HeaderUserPanel;
