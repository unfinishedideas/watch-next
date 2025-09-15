import { useUser } from "../hooks/UserHooks.ts";
import { useNavigate } from "react-router";

const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start" />
      <div className="navbar-center">
        {/* TODO: Make this not an animated button but a logo */}
        <a className="btn btn-ghost text-3xl" onClick={() => navigate("/")}>
          Watch Next!
        </a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex flex-row items-end">
            {user ? (
              <p className="btn mr-5">{user.username}</p>
            ) : (
              <p className="mr-5">Log In / Register</p>                
            )}

            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar avatar-online avatar-placeholder"
            >
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                {user ? (
                  <span className="text-xl">
                    {user.username[0].toUpperCase()}
                  </span>
                ) : (
                  <span className="text-xl">_</span>
                )}
              </div>
            </div>
          </div>
          {user ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow"
            >
              <li
                onClick={() => navigate('/welcome')}
              >
                <a>Profile</a>
              </li>

              <li
                onClick={() => {
                  setUser(undefined);
                  navigate("/logout");
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li onClick={() => navigate("/login")}>
                <a>Login</a>
              </li>
              <li onClick={() => navigate("/register")}>
                <a>Register</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

/* TODO: Avatars!
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
  <div className="w-10 rounded-full">
    <img
      alt="Tailwind CSS Navbar component"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div> */
