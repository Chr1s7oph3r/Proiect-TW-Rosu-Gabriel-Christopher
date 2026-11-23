import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import FilmePage from "./pages/FilmePage.jsx";
import FilmDetaliuPage from "./pages/FilmDetaliuPage.jsx";
import UtilizatorPage from "./pages/UtilizatorPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FilmePage />} />
        <Route path="/filme/:id" element={<FilmDetaliuPage />} />
        <Route path="/utilizatori/:id" element={<UtilizatorPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}