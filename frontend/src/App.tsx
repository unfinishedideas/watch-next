import "./App.css";
import Header from "./components/Header.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <Header />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
