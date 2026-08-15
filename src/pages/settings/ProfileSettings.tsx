import "./ProfileSettings.css";

import {
  Mail,
  LockKeyhole,
  ArrowRight,
  X,
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import { supabase } from "../../lib/supabase";

type PopupType = "email" | "password" | null;

export default function ProfileSettings() {

  const [popup, setPopup] = useState<PopupType>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] =
    useState<"email" | "password" | null>(null);
  // =====================================================
  // EMAIL
  // =====================================================

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // =====================================================
  // PASSWORD
  // =====================================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState<
    "idle" | "checking" | "correct" | "incorrect"
  >("idle");

  const [passwordMatch, setPasswordMatch] = useState<
    "idle" | "match" | "mismatch"
  >("idle");
  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);


  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closePopup = () => {

    setPopup(null);

    setCurrentEmail("");
    setNewEmail("");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setLoading(false);
  };


  // =====================================================
  // UPDATE EMAIL
  // =====================================================

  const handleUpdateEmail = async () => {

    if (!currentEmail.trim()) {
      toast.error("Please enter your current email.");
      return;
    }

    if (!newEmail.trim()) {
      toast.error("Please enter your new email.");
      return;
    }

    if (
      currentEmail.trim().toLowerCase() ===
      newEmail.trim().toLowerCase()
    ) {
      toast.error(
        "New email must be different from current email."
      );
      return;
    }

    try {

      setLoading(true);

      // Get currently authenticated user
      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error(
          "Admin session not found. Please login again."
        );
        return;
      }


      // =================================================
      // VERIFY CURRENT EMAIL
      // =================================================

      if (
        user.email?.toLowerCase() !==
        currentEmail.trim().toLowerCase()
      ) {
        toast.error(
          "Current email is incorrect."
        );
        return;
      }


      // =================================================
      // UPDATE EMAIL
      // =================================================

      const { error } =
        await supabase.auth.updateUser({
          email: newEmail.trim(),
        });


      if (error) {
        throw error;
      }


      toast.success(
        "Email updated successfully. Please login again."
      );

      // Logout admin
      await supabase.auth.signOut();

      closePopup();
    } catch (error: any) {

      console.error(
        "Email update error:",
        error
      );

      toast.error(
        error?.message ||
        "Failed to update email."
      );

    } finally {

      setLoading(false);

    }

  };
  // =====================================================
  // VERIFY CURRENT PASSWORD
  // =====================================================

  const verifyCurrentPassword = async () => {
    if (!currentPassword) {
      setPasswordVerified("idle");
      return;
    }

    try {
      setPasswordVerified("checking");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setPasswordVerified("incorrect");

        toast.error(
          "Admin session not found. Please login again."
        );

        return;
      }

      const { error } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });

      if (error) {
        setPasswordVerified("incorrect");
        return;
      }

      setPasswordVerified("correct");

    } catch (error) {

      console.error(
        "Password verification error:",
        error
      );

      setPasswordVerified("incorrect");

    }
  };

  // =====================================================
  // UPDATE PASSWORD
  // =====================================================

  const handleUpdatePassword = async () => {

    if (!currentPassword) {
      toast.error(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      toast.error(
        "Please enter your new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      toast.error(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "New passwords do not match."
      );
      return;
    }

    try {

      setLoading(true);


      // =================================================
      // GET CURRENT USER
      // =================================================

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();


      if (!user?.email) {
        toast.error(
          "Admin session not found. Please login again."
        );
        return;
      }


      // =================================================
      // UPDATE PASSWORD
      //
      // current_password verifies the old password.
      // =================================================

      const { error } =
        await supabase.auth.updateUser({
          current_password: currentPassword,
          password: newPassword,
        } as any);


      if (error) {
        throw error;
      }


      toast.success(
        "Password updated successfully. Please login again."
      );

      // Logout admin
      await supabase.auth.signOut();

      closePopup();

    } catch (error: any) {

      console.error(
        "Password update error:",
        error
      );

      toast.error(
        error?.message ||
        "Current password is incorrect or password update failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="profile-settings">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="settings-page-header">

        <h1>
          Account Settings
        </h1>

        <p>
          Manage your account email and password.
        </p>

      </div>


      {/* =====================================================
          SETTINGS CARDS
      ===================================================== */}

      <div className="account-settings-grid">


        {/* =================================================
            EMAIL CARD
        ================================================= */}

        <div className="account-setting-card">

          <div className="setting-card-icon email-icon">

            <Mail size={26} />

          </div>


          <div className="setting-card-content">

            <h2>
              Update Email
            </h2>

            <p>
              Change the email address associated
              with your admin account.
            </p>

          </div>


          <button
            className="setting-card-button"
            onClick={() =>
              setPopup("email")
            }
          >

            Update Email

            <ArrowRight size={18} />

          </button>

        </div>


        {/* =================================================
            PASSWORD CARD
        ================================================= */}

        <div className="account-setting-card">

          <div className="setting-card-icon password-icon">

            <LockKeyhole size={26} />

          </div>


          <div className="setting-card-content">

            <h2>
              Update Password
            </h2>

            <p>
              Change your admin account password
              to keep your account secure.
            </p>

          </div>


          <button
            className="setting-card-button"
            onClick={() =>
              setPopup("password")
            }
          >

            Update Password

            <ArrowRight size={18} />

          </button>

        </div>

      </div>


      {/* =====================================================
          EMAIL POPUP
      ===================================================== */}

      {popup === "email" && (

        <div className="settings-popup-overlay">

          <div className="settings-popup">

            <button
              className="popup-close"
              onClick={closePopup}
            >

              <X size={20} />

            </button>


            <div className="popup-icon email-icon">

              <Mail size={24} />

            </div>


            <h2>
              Update Email
            </h2>


            <p className="popup-description">

              Enter your current email and
              the new email address.

            </p>


            <div className="popup-form">


              <div className="form-group">

                <label>
                  Current Email
                </label>

                <input
                  type="email"
                  placeholder="Enter current email"
                  value={currentEmail}
                  onChange={(e) =>
                    setCurrentEmail(
                      e.target.value
                    )
                  }
                  disabled={loading}
                />

              </div>


              <div className="form-group">

                <label>
                  New Email
                </label>

                <input
                  type="email"
                  placeholder="Enter new email address"
                  value={newEmail}
                  onChange={(e) =>
                    setNewEmail(
                      e.target.value
                    )
                  }
                  disabled={loading}
                />

              </div>


              <button
                className="popup-action"
                onClick={() => {
                  setConfirmationType("email");
                  setShowConfirmation(true);
                }}
                disabled={loading}
              >
                Update Email
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          PASSWORD POPUP
      ===================================================== */}

      {popup === "password" && (

        <div className="settings-popup-overlay">

          <div className="settings-popup">

            <button
              className="popup-close"
              onClick={closePopup}
            >

              <X size={20} />

            </button>


            <div className="popup-icon password-icon">

              <LockKeyhole size={24} />

            </div>


            <h2>
              Update Password
            </h2>


            <p className="popup-description">

              Verify your current password
              before creating a new one.

            </p>


            <div className="popup-form">


              <div className="form-group">

                <label>
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setPasswordVerified("idle");
                  }}
                  onBlur={verifyCurrentPassword}
                  disabled={loading}
                  className={
                    passwordVerified === "correct"
                      ? "input-success"
                      : passwordVerified === "incorrect"
                        ? "input-error"
                        : ""
                  }
                />

                {passwordVerified === "checking" && (
                  <div className="password-status checking">
                    Checking password...
                  </div>
                )}

                {passwordVerified === "correct" && (
                  <div className="password-status correct">
                    ✓ Current password is correct
                  </div>
                )}

                {passwordVerified === "incorrect" && (
                  <div className="password-status incorrect">
                    ✕ Current password is incorrect
                  </div>
                )}

              </div>


              <div className="form-group">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    const value = e.target.value;

                    setNewPassword(value);

                    if (!value || !confirmPassword) {
                      setPasswordMatch("idle");
                    } else if (value === confirmPassword) {
                      setPasswordMatch("match");
                    } else {
                      setPasswordMatch("mismatch");
                    }
                  }}
                  disabled={loading}
                />

              </div>


              <div className="form-group">

                <label>
                  Confirm New Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;

                    setConfirmPassword(value);

                    if (!value || !newPassword) {
                      setPasswordMatch("idle");
                    } else if (newPassword === value) {
                      setPasswordMatch("match");
                    } else {
                      setPasswordMatch("mismatch");
                    }
                  }}
                  disabled={loading}
                  className={
                    passwordMatch === "match"
                      ? "input-success"
                      : passwordMatch === "mismatch"
                        ? "input-error"
                        : ""
                  }
                />

                {passwordMatch === "match" && (
                  <div className="password-status correct">
                    ✓ Passwords match
                  </div>
                )}

                {passwordMatch === "mismatch" && (
                  <div className="password-status incorrect">
                    ✕ Passwords do not match
                  </div>
                )}
              </div>


              <button
                className="popup-action"
                onClick={() => {
                  if (passwordVerified !== "correct") {
                    toast.error(
                      "Please enter the correct current password."
                    );
                    return;
                  }

                  if (passwordMatch !== "match") {
                    toast.error(
                      "New password and confirm password must match."
                    );
                    return;
                  }

                  setConfirmationType("password");
                  setShowConfirmation(true);
                }}
                disabled={
                  loading ||
                  passwordVerified !== "correct" ||
                  passwordMatch !== "match"
                }
              >
                Update Password
              </button>


            </div>

          </div>

        </div>

      )}

      {/* =====================================================
    CONFIRMATION POPUP
===================================================== */}

      {showConfirmation && (

        <div className="settings-popup-overlay">

          <div className="settings-popup confirmation-popup">

            <div className="confirmation-icon">
              ⚠️
            </div>

            <h2>
              Are you sure?
            </h2>

            <p className="popup-description">

              {confirmationType === "email"
                ? "Your email address will be changed. You will be logged out and must login again with your new email."
                : "Your password will be changed. You will be logged out and must login again with your new password."
              }

            </p>

            <div className="confirmation-actions">

              <button
                className="confirmation-cancel"
                onClick={() => {
                  setShowConfirmation(false);
                  setConfirmationType(null);
                }}
                disabled={loading}
              >
                Cancel
              </button>


              <button
                className="confirmation-confirm"
                onClick={async () => {

                  setShowConfirmation(false);

                  if (confirmationType === "email") {
                    await handleUpdateEmail();
                  }

                  if (confirmationType === "password") {
                    await handleUpdatePassword();
                  }

                  setConfirmationType(null);

                }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Yes, Update"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}