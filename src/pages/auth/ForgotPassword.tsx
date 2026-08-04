import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { forgotPassword } from "../../services/auth.service";

export default function ForgotPassword() {

  console.log("ForgotPassword component rendered"); //
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Forgot Password clicked");
    console.log(email);

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      alert(res.message);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="forgot-container">
      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email address.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <Link to="/">
          ← Back to Login
        </Link>

      </div>
    </div>
  );
}