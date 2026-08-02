import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onMessage, messaging } from "./firebase/firebase";
/* Admin */
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Projects from "./pages/projects/Projects";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import VisionBoard from "./pages/vision/VisionBoard";
import AdminForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


/* User */
import UserLogin from "./pages/user/auth/Login";
import Signup from "./pages/user/auth/Signup";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import UserDashboard from "./pages/user/dashboard/Dashboard";
import Home from "./pages/user/home/Home";
import { Toaster } from "react-hot-toast";
import TaskDetails from "./pages/user/home/task/TaskDetails";

export default function App() {

  useEffect(() => {

    const unsubscribe = onMessage(
      messaging,
      (payload) => {

        console.log("Foreground Notification:");
        console.log(payload);

        new Notification(
          payload.notification?.title || "Task Manager",
          {
            body: payload.notification?.body,
            icon: "/favicon.ico",
          }
        );
      }
    );

    return () => unsubscribe();

  }, []);
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>

        {/* ---------------- ADMIN ---------------- */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/vision" element={<VisionBoard />} />
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route
          path="/admin/reset-password"
          element={<ResetPassword />}
        />

        {/* ---------------- USER AUTH ---------------- */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route
          path="/user/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ---------------- USER PANEL ---------------- */}
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/task/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}