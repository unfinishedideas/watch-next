import Header from "../components/Header.tsx";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to your movie night
      </h1>
      {/* TODO: Write a good copy :P */}
      <p>Watch Next! is a platform where you and your friends can create Watch Lists for all the movies and tv shows you want to watch</p>
      <p>You can rate them, share lists and more!</p>
      <p>Do note that this is a prototype and a lot more functionality is yet to come!</p>
    </div>
  );
};

export default HomeScreen;
