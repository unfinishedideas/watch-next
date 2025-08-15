import { useNavigate } from "react-router";

const LogoutScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        className="
          mb-4 
          text-4xl 
          font-extrabold 
          leading-none 
          tracking-tight 
          text-gray-900 
          md:text-5xl 
          lg:text-6xl 
          dark:text-white"
      >
        You have been logged out
      </h1>
      <div className="flex flex-col">
          <a
            onClick={() => navigate("/login")}
            className="btn btn-xs btn-primary sm:btn-md md:btn-md lg:btn-lg xl:btn-lg lg:mx-20 mb-3"
          >
            Log In
          </a>
          <a
            onClick={() => navigate("/register")}
            className="btn btn-xs btn-primary sm:btn-md md:btn-md lg:btn-lg xl:btn-lg lg:mx-20"
          >
            Sign Up
          </a>
      </div>
    </div>
  );
};

export default LogoutScreen;
