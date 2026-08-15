import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onMessage, messaging } from "./firebase/firebase";
/* Admin */

import { Capacitor } from "@capacitor/core";
import { supabase } from "./lib/supabase";
import {
  initializePushNotifications,
  getFCMToken,
  saveFCMToken,
} from "./services/notification.service";

import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Projects from "./pages/projects/Projects";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import VisionBoard from "./pages/vision/VisionBoard";
import AdminForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import UserDetails from "./pages/users/UserDetails";

/* User */
import UserProtectedRoute from "./routes/UserProtectedRoute";
import UserLogin from "./pages/user/auth/Login";
import Signup from "./pages/user/auth/Signup";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import UserDashboard from "./pages/user/dashboard/Dashboard";
import Home from "./pages/user/home/Home";
import { Toaster } from "react-hot-toast";
import TaskDetails from "./pages/user/home/task/TaskDetails";
import Profile from "./pages/user/profile/Profile";

export default function App() {

  useEffect(() => {
    let unsubscribeFCM: (() => void) | undefined;
    let mounted = true;

    // =====================================================
    // INITIALIZE NOTIFICATIONS
    // =====================================================

    const initializeNotifications = async (
      userId: string | undefined
    ) => {
      if (!userId) {
        console.log(
          "No authenticated user. Notification initialization skipped."
        );
        return;
      }

      if (!mounted) return;

      try {
        // =====================================================
        // GET USER PROFILE
        // =====================================================

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("users")
          .select("id, role, full_name")
          .eq("auth_id", userId)
          .single();

        if (profileError) {
          console.error(
            "Failed to get user profile:",
            profileError
          );
          return;
        }

        console.log(
          "================================"
        );

        console.log(
          "NOTIFICATION INITIALIZATION"
        );

        console.log(
          "USER:",
          profile.full_name
        );

        console.log(
          "ROLE:",
          profile.role
        );

        console.log(
          "NATIVE:",
          Capacitor.isNativePlatform()
        );

        console.log(
          "================================"
        );

        // =====================================================
        // ANDROID / CAPACITOR
        // =====================================================

        if (Capacitor.isNativePlatform()) {
          console.log(
            "📱 Running on Android"
          );

          await initializePushNotifications(
            profile.id
          );

          return;
        }

        // =====================================================
        // WEB / ADMIN
        // =====================================================

        if (profile.role === "admin") {
          console.log(
            "💻 Admin detected. Initializing Web FCM..."
          );

          const token = await getFCMToken();

          if (!token) {
            console.error(
              "❌ Admin FCM token was not generated"
            );
            return;
          }

          console.log(
            "✅ Admin FCM token generated"
          );

          const saved = await saveFCMToken(
            profile.id,
            token
          );

          if (saved) {
            console.log(
              "✅ ADMIN FCM TOKEN SAVED TO SUPABASE"
            );
          } else {
            console.error(
              "❌ ADMIN FCM TOKEN FAILED TO SAVE"
            );
          }
        } else {
          console.log(
            "Web user is not admin. Web FCM registration skipped."
          );
        }

      } catch (error) {
        console.error(
          "❌ Notification initialization error:",
          error
        );
      }
    };

    // =====================================================
    // INITIALIZE FOREGROUND WEB FCM
    // =====================================================

    if (!Capacitor.isNativePlatform()) {
      unsubscribeFCM = onMessage(
        messaging,
        (payload) => {
          console.log(
            "================================"
          );

          console.log(
            "📩 ADMIN FOREGROUND PUSH RECEIVED"
          );

          console.log(
            "TITLE:",
            payload.notification?.title
          );

          console.log(
            "BODY:",
            payload.notification?.body
          );

          console.log(
            "DATA:",
            payload.data
          );

          console.log(
            "================================"
          );

          if (
            Notification.permission ===
            "granted"
          ) {
            new Notification(
              payload.notification?.title ||
              "Task Manager",
              {
                body:
                  payload.notification?.body ||
                  "You have a new notification",
                icon: "/favicon.ico",
              }
            );
          }
        }
      );
    }

    // =====================================================
    // CHECK CURRENT LOGIN
    // =====================================================

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        initializeNotifications(
          session?.user?.id
        );
      });

    // =====================================================
    // WATCH LOGIN / LOGOUT
    // =====================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        console.log(
          "AUTH STATE:",
          _event
        );

        // =====================================================
        // ADMIN / USER LOGOUT
        // =====================================================

        if (_event === "SIGNED_OUT") {

          console.log(
            "🔴 User signed out. Redirecting to login..."
          );

          window.location.hash = "/";

          return;
        }

        // =====================================================
        // LOGIN / SESSION
        // =====================================================

        if (session?.user?.id) {

          setTimeout(() => {

            initializeNotifications(
              session.user.id
            );

          }, 0);

        }

      }
    );

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      mounted = false;

      subscription.unsubscribe();

      if (unsubscribeFCM) {
        unsubscribeFCM();
      }
    };
  }, []);
  return (
    <HashRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>

        {/* ---------------- ADMIN ---------------- */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/users/:id"
          element={<UserDetails />}
        />
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

        <Route path="/user/signup" element={<Signup />} />
        <Route
          path="/user/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ---------------- USER PANEL ---------------- */}
        <Route
          path="/user/home"
          element={
            <UserProtectedRoute>
              <Home />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/user/task/:id"
          element={
            <UserProtectedRoute>
              <TaskDetails />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}