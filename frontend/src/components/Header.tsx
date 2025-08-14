const Header: React.FC = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start" />
      <div className="navbar-center">
        {/* TODO: Make this not an animated button but a logo */}
        <a className="btn btn-ghost text-2xl">Watch Next!</a>
      </div>
      <div className="navbar-end" />
    </div>
  );
};

export default Header;
