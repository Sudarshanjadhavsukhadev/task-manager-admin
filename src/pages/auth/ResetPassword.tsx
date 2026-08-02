import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("EVENT:", event);
      console.log("SESSION:", session);
    });

    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Updating password...");

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    console.log("UPDATE DATA:", data);
    console.log("UPDATE ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password Updated Successfully");
  };

  return (
    <>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={updatePassword}>
        Update Password
      </button>
    </>
  );
}