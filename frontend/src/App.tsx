import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Participant from "./pages/Participant";
import Talk from "./pages/Talk";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/participant" element={<Participant/>} />
        <Route path="/talk" element={<Talk/>} />
      </Routes>
    </BrowserRouter>
  );
}
