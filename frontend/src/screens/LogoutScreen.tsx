import { useNavigate } from "react-router";

const LogoutScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white mb-10">
        You have been logged out
      </h2>
      <div className="flex flex-col">
        <a
          onClick={() => navigate("/")}
          className="btn btn-xs btn-primary sm:btn-md md:btn-md lg:btn-lg xl:btn-lg lg:mx-20 mb-3"
        >
          Home
        </a>
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
