import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Dashboard from "@/pages/dashboard/Dashboard";
import Documents from "@/pages/documents/Documents";
import Chat from "@/pages/chat/Chat";

import MainLayout from "@/layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/documents"
            element={<Documents />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />
        </Route>
        <Route
            path="/documents"
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
            >
            <Route index element={<Documents />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;