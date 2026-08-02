import { Link } from "react-router-dom";
import "./Auth.css";

export default function ForgotPassword() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo-circle">
          🔒
        </div>

        <h1>Forgot Password?</h1>
        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

        <form className="auth-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="auth-btn">
            Send Reset Link
          </button>

        </form>

        <div className="auth-footer">
          Remember your password?
          <Link to="/user/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}