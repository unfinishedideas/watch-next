import { useUser } from "../hooks/UserHooks.ts";

const Header: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start" />
      <div className="navbar-center">
        {/* TODO: Make this not an animated button but a logo */}
        <a className="btn btn-ghost text-2xl">Watch Next!</a>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar avatar-online avatar-placeholder"
            >
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-xl">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar avatar-placeholder"
            >
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-xl">_</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
        )}
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
