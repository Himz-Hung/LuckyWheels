import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import SettingPage from "../pages/settingPage/SettingPage";
import LoginPage from "../pages/loginPage/LoginPage";

import ProtectedRoute from "./ProtectedRoute";

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
            path="/"
            element={<HomePage />}
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