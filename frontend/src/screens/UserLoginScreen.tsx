import Header from "../components/Header.tsx";
import UserLoginForm from "../components/UserLoginForm.tsx";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Please Log In
      </h1>
      <UserLoginForm/>
    </div>
  );
};

export default HomeScreen;
