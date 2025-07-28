import './Header.css';
import HeaderLogo from './HeaderLogo.tsx'
import HeaderUserPanel from './HeaderUserPanel.tsx'

function Header()
{
    return(
        <div className="header-container">
            <HeaderLogo/>
            <HeaderUserPanel/>
        </div>
    )
}

export default Header;
