import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import SettingPage from "../pages/settingPage/SettingPage";
import LoginPage from "../pages/loginPage/LoginPage";

import ProtectedRoute from "./ProtectedRoute";
import WheelPage from "../pages/wheelPage/WheelPage";

const HomePage = () => <h1>Home Page</h1>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={<HomePage />}
          />
          <Route
            path="*"
            element={<WheelPage />}
          />
          <Route
            path="/wheel"
            element={<WheelPage />}
          />

          <Route
            path="/setting"
            element={<SettingPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}