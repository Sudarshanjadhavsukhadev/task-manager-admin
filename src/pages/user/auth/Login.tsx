import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth.service";
import "./Auth.css";
import { getFCMToken } from "../../../services/notification.service";
import { updateUserFCMToken } from "../../../services/user.service";

export default function Login() {
  const navigate = useNavigate();

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
      localStorage.setItem(
        "token",
        res.data.session.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Save FCM Token
      if (token) {
        console.log("Saving token to backend...");

        const result = await updateUserFCMToken(
          res.data.user.id,
          token
        );

        console.log("Backend Response:", result);
      } else {
        console.log("No FCM token received");
      }

      alert("Login Successful!");

      navigate("/user/home");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo-circle">
          ✓
        </div>

        <h1>Welcome Back 👋</h1>
        <p>Login to continue managing your tasks.</p>

        <form className="auth-form" onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-options">
            <Link to="/user/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/user/signup">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}