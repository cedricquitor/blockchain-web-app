import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  return (
    <AccountContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AccountContextProvider>
  );
}

export default App;
