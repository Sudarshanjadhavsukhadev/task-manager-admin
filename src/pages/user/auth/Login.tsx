import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth.service";
import "./Auth.css";
import { getFCMToken } from "../../../services/notification.service";
import { updateUserFCMToken } from "../../../services/user.service";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {
      navigate("/user/home");
    }

  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Login first
      const res = await login(email, password);

      // Get Firebase token
      // Get Firebase token
      console.log("Getting FCM token...");

      const token = await getFCMToken();

      console.log("FCM Token:", token);

      // Save Login
      // Save Login
      localStorage.setItem(
        "token",
        res.session.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      // Save FCM Token
      if (token) {
        console.log("Saving token to backend...");

        const result = await updateUserFCMToken(
          res.user.id,
          token
        );

        console.log("Backend Response:", result);
      }
      else {
        console.log("No FCM token received");
      }

      toast.success("Login successful!");

      if (res.user.role === "admin") {

        localStorage.setItem(
          "admin",
          JSON.stringify(res.user)
        );

        navigate("/dashboard");

      } else {

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );

        navigate("/user/home");

      }

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">

      {/* ================= LEFT BRANDING ================= */}

      <div className="auth-brand">

        <div className="brand-logo">
          MJK
        </div>

        <div className="brand-content">

          <span className="brand-label">
            MJK WORKSPACE
          </span>

          <h2>
            Manage work.
            <br />
            Stay ahead.
          </h2>

          <p>
            A simple and powerful workspace for
            managing projects, tasks and schedules.
          </p>

        </div>

        <div className="brand-footer">
          © 2026 MJK Task Manager
        </div>

      </div>


      {/* ================= LOGIN SIDE ================= */}

      <div className="auth-content">

        <div className="auth-card">

          <div className="mobile-logo">
            MJK
          </div>

          <div className="auth-heading">

            <span className="welcome-label">
              WELCOME BACK
            </span>

            <h1>
              Sign in to your account
            </h1>

            <p>
              Enter your details to continue
              managing your workspace.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

            <div className="input-group">

              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />

            </div>


            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />

            </div>


            <div className="auth-options">

              <Link to="/user/forgot-password">
                Forgot password?
              </Link>

            </div>


            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>


          <div className="auth-divider">
            <span />
            <p>Secure workspace access</p>
            <span />
          </div>


          <div className="auth-footer">

            <span>
              Don't have an account?
            </span>

            <Link to="/user/signup">
              Create account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}