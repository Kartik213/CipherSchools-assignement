import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Followerspage from "./pages/Followerspage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="followers" element={<Followerspage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
