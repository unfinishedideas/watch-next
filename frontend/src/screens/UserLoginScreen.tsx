import Header from "../components/Header.tsx";
import UserLoginForm from "../components/UserLoginForm.tsx";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <Header />
      <UserLoginForm />
    </div>
  );
};

export default HomeScreen;
