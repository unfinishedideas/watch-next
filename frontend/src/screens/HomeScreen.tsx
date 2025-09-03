import { useNavigate } from "react-router";
import { useUser } from "../hooks/UserHooks.ts";

const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="">
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
        Welcome to your movie night
      </h1>
      <p>
        Watch Next! is a platform where you and your friends can create Watch
        Lists for all the movies and tv shows you want to watch together.
      </p>
      <p className="mb-5">
        Create lists, rate movies, share your favorite quotes and grab the
        popcorn!
      </p>
      <p className="mb-5">
        Do note that this is a prototype and a lot more functionality is yet to
        come!
      </p>
      {user ? (
        <div />
      ) : (
        <div className="flex flex-col">
          <p className="mb-15">Ready to get started?</p>
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
      )}
    </div>
  );
};

export default HomeScreen;
