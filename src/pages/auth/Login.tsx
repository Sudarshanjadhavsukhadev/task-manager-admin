import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { adminLogin } from "../../services/auth.service";
import { getFCMToken } from "../../services/notification.service";
import { updateUserFCMToken } from "../../services/user.service";


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await adminLogin(
        email,
        password
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "token",
        res.data.session.access_token
      );

      const token = await getFCMToken();

      if (token) {
        await updateUserFCMToken(
          res.data.user.id,
          token
        );
      }

      navigate("/dashboard");

    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-login">

      <div className="login-left">
        <div className="brand">
          <h1>Task Manager</h1>

          <p>
            Manage projects, tasks and your team from one powerful dashboard.
          </p>

          <ul>
            <li>✔ Project Management</li>
            <li>✔ Task Tracking</li>
            <li>✔ Reports & Analytics</li>
            <li>✔ Team Collaboration</li>
          </ul>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              to="/admin/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>
      </div>

    </div>
  );
}