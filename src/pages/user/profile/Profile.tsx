import { useEffect, useState } from "react";

import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  LogOut,
  LockKeyhole,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { supabase } from "../../../lib/supabase";

import "./Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  // =====================================================
  // PASSWORD POPUP
  // =====================================================

  const [showPasswordPopup, setShowPasswordPopup] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordChecking, setPasswordChecking] =
    useState(false);

  const [passwordCorrect, setPasswordCorrect] =
    useState<boolean | null>(null);

  const [updatingPassword, setUpdatingPassword] =
    useState(false);


  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    try {

      await supabase.auth.signOut();

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    } finally {

      localStorage.removeItem("user");

      localStorage.removeItem("token");

      localStorage.removeItem("admin");

      navigate("/");

    }

  };


  // =====================================================
  // VERIFY CURRENT PASSWORD
  // =====================================================

  const verifyCurrentPassword = async (
    password: string
  ) => {

    setCurrentPassword(password);

    setPasswordCorrect(null);

    if (!password) {
      return;
    }

    if (!user?.email) {
      return;
    }

    try {

      setPasswordChecking(true);

      const {
        error,
      } =
        await supabase.auth.signInWithPassword({

          email: user.email,

          password,

        });

      if (error) {

        setPasswordCorrect(false);

      } else {

        setPasswordCorrect(true);

      }

    } catch (error) {

      console.error(
        "Password verification error:",
        error
      );

      setPasswordCorrect(false);

    } finally {

      setPasswordChecking(false);

    }

  };


  // =====================================================
  // UPDATE PASSWORD
  // =====================================================

  const handleUpdatePassword = async () => {

    // ---------------------------------------------
    // CHECK CURRENT PASSWORD
    // ---------------------------------------------

    if (!passwordCorrect) {

      toast.error(
        "Please enter your correct current password."
      );

      return;

    }


    // ---------------------------------------------
    // CHECK NEW PASSWORD
    // ---------------------------------------------

    if (!newPassword) {

      toast.error(
        "Please enter a new password."
      );

      return;

    }


    // ---------------------------------------------
    // PASSWORD LENGTH
    // ---------------------------------------------

    if (newPassword.length < 6) {

      toast.error(
        "Password must be at least 6 characters."
      );

      return;

    }


    // ---------------------------------------------
    // CHECK CONFIRM PASSWORD
    // ---------------------------------------------

    if (
      newPassword !==
      confirmPassword
    ) {

      toast.error(
        "New passwords do not match."
      );

      return;

    }


    // ---------------------------------------------
    // FINAL CONFIRMATION
    // ---------------------------------------------

    const confirmed =
      window.confirm(
        "Are you sure you want to update your password?\n\nYou will be logged out after the password is changed."
      );

    if (!confirmed) return;


    try {

      setUpdatingPassword(true);


      // ---------------------------------------------
      // UPDATE SUPABASE PASSWORD
      // ---------------------------------------------

      const {
        error,
      } =
        await supabase.auth.updateUser({
          password: newPassword,
        });


      if (error) {

        throw error;

      }


      // ---------------------------------------------
      // SUCCESS MESSAGE
      // ---------------------------------------------

      toast.success(
        "Password updated successfully. Please login again."
      );


      // ---------------------------------------------
      // LOGOUT SUPABASE SESSION
      // ---------------------------------------------

      await supabase.auth.signOut();


      // ---------------------------------------------
      // CLEAR LOCAL STORAGE
      // ---------------------------------------------

      localStorage.removeItem("user");

      localStorage.removeItem("token");

      localStorage.removeItem("admin");


      // ---------------------------------------------
      // CLOSE POPUP
      // ---------------------------------------------

      setShowPasswordPopup(false);


      // ---------------------------------------------
      // GO TO LOGIN
      // ---------------------------------------------

      setTimeout(() => {

        navigate("/");

      }, 1000);


    } catch (error: any) {

      console.error(
        "Password update error:",
        error
      );

      toast.error(
        error?.message ||
        "Failed to update password."
      );

    } finally {

      setUpdatingPassword(false);

    }

  };


  // =====================================================
  // RESET PASSWORD POPUP
  // =====================================================

  const closePasswordPopup = () => {

    setShowPasswordPopup(false);

    setCurrentPassword("");

    setNewPassword("");

    setConfirmPassword("");

    setPasswordCorrect(null);

    setPasswordChecking(false);

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (!user) {

    return (

      <div className="profile-page">

        <div className="profile-loading">

          Loading profile...

        </div>

      </div>

    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="profile-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="profile-header">

        <button
          className="profile-back-button"
          onClick={() =>
            navigate("/user/home")
          }
        >

          <ArrowLeft size={20} />

        </button>

        <h1>
          My Profile
        </h1>

      </div>


      {/* =================================================
          PROFILE CARD
      ================================================= */}

      <div className="profile-card">

        <div className="profile-avatar">

          {user.full_name
            ? user.full_name
                .charAt(0)
                .toUpperCase()
            : "U"}

        </div>

        <h2>
          {user.full_name || "User"}
        </h2>

        <p className="profile-role">
          {user.role || "User"}
        </p>

      </div>


      {/* =================================================
          ACCOUNT INFORMATION
      ================================================= */}

      <div className="profile-info-card">

        <h3>
          Account Information
        </h3>


        {/* NAME */}

        <div className="profile-info-row">

          <div className="profile-info-icon">

            <User size={20} />

          </div>

          <div className="profile-info-content">

            <span>
              Full Name
            </span>

            <p>
              {user.full_name ||
                "Not available"}
            </p>

          </div>

        </div>


        {/* EMAIL */}

        <div className="profile-info-row">

          <div className="profile-info-icon">

            <Mail size={20} />

          </div>

          <div className="profile-info-content">

            <span>
              Email Address
            </span>

            <p>
              {user.email ||
                "Not available"}
            </p>

          </div>

        </div>


        {/* USER ID */}

        <div className="profile-info-row">

          <div className="profile-info-icon">

            <ShieldCheck size={20} />

          </div>

          <div className="profile-info-content">

            <span>
              User ID
            </span>

            <p className="user-id">

              {user.id ||
                "Not available"}

            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          UPDATE PASSWORD CARD
      ================================================= */}

      <div className="update-password-card">

        <div className="update-password-icon">

          <LockKeyhole size={22} />

        </div>


        <div className="update-password-content">

          <h3>
            Update Password
          </h3>

          <p>
            Change your password to keep
            your account secure.
          </p>

        </div>


        <button
          className="update-password-button"
          onClick={() =>
            setShowPasswordPopup(true)
          }
        >

          Update

        </button>

      </div>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <button
        className="profile-logout-button"
        onClick={handleLogout}
      >

        <LogOut size={20} />

        Logout

      </button>


      {/* =================================================
          PASSWORD POPUP
      ================================================= */}

      {showPasswordPopup && (

        <div className="password-popup-overlay">

          <div className="password-popup">


            {/* CLOSE */}

            <button
              className="password-popup-close"
              onClick={
                closePasswordPopup
              }
            >

              <X size={20} />

            </button>


            {/* ICON */}

            <div className="password-popup-icon">

              <LockKeyhole size={25} />

            </div>


            {/* TITLE */}

            <h2>
              Update Password
            </h2>

            <p>

              Verify your current password
              before creating a new one.

            </p>


            {/* =================================================
                CURRENT PASSWORD
            ================================================= */}

            <div className="password-form-group">

              <label>
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) =>
                  verifyCurrentPassword(
                    e.target.value
                  )
                }
              />


              {/* CHECKING */}

              {passwordChecking && (

                <span className="password-checking">

                  Checking password...

                </span>

              )}


              {/* CORRECT */}

              {passwordCorrect === true && (

                <span className="password-success">

                  ✓ Current password is correct

                </span>

              )}


              {/* INCORRECT */}

              {passwordCorrect === false && (

                <span className="password-error">

                  ✕ Current password is incorrect

                </span>

              )}

            </div>


            {/* =================================================
                NEW PASSWORD
            ================================================= */}

            <div className="password-form-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

            </div>


            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div className="password-form-group">

              <label>
                Confirm New Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />


              {confirmPassword && (

                <>

                  {newPassword ===
                  confirmPassword ? (

                    <span className="password-success">

                      ✓ Passwords match

                    </span>

                  ) : (

                    <span className="password-error">

                      ✕ Passwords do not match

                    </span>

                  )}

                </>

              )}

            </div>


            {/* =================================================
                UPDATE BUTTON
            ================================================= */}

            <button
              className="password-update-button"
              disabled={
                updatingPassword ||
                !passwordCorrect ||
                !newPassword ||
                !confirmPassword ||
                newPassword !==
                  confirmPassword
              }
              onClick={
                handleUpdatePassword
              }
            >

              {updatingPassword
                ? "Updating..."
                : "Update Password"}

            </button>

          </div>

        </div>

      )}


      {/* =================================================
          BOTTOM SPACE
      ================================================= */}

      <div className="profile-bottom-space" />

    </div>

  );

}