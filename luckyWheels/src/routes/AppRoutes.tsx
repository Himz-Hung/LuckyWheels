import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import SettingPage from "../pages/settingPage/SettingPage";

const HomePage = () => <h1>Home Page</h1>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}