import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PagesLayout from "./ui/PagesLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
