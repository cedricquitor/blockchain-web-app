import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountContextProvider } from "./context/AccountContext";
import Navbar from "./components/Navbar";
import Vote from "./pages/Vote";
import Mint from "./pages/Mint";
import Burn from "./pages/Burn";

function App() {
  return (
    <AccountContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Vote />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/burn" element={<Burn />} />
        </Routes>
      </BrowserRouter>
    </AccountContextProvider>
  );
}

export default App;
