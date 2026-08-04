import { supabase } from "../lib/supabase";

export const signup = async (
  fullName: string,
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from("users")
      .insert({
        auth_id: data.user.id,
        full_name: fullName,
        email,
        role: "user",
      });

    if (profileError) throw profileError;
  }

  return data;
};

export const login = async (
  email: string,
  password: string
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  const { data: profile, error: profileError } =
    await supabase
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

  if (profileError) throw profileError;

  if (!profile.role) {
    throw new Error(
      "User role not assigned. Contact administrator."
    );
  }

  return {
    user: profile,
    session: data.session,
  };
};

export const adminLogin = async (
  email: string,
  password: string
) => {
  console.log("========== ADMIN LOGIN ==========");
  console.log("Email:", email);
  console.log("Password:", password);

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    console.log("LOGIN ERROR OBJECT:", error);
    console.log("LOGIN ERROR MESSAGE:", error.message);
    console.log("LOGIN ERROR STATUS:", error.status);

    throw error;
  }

  console.log("SUPABASE LOGIN SUCCESS");

  const { data: profile, error: profileError } =
    await supabase
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

  if (profileError) throw profileError;

  if (profile.role !== "admin") {
    throw new Error("Access denied. Admin only.");
  }

  return {
    user: profile,
    session: data.session,
  };
};

export const forgotPassword = async (
  email: string
) => {
  const { error } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "https://sudarshanjadhavsukhadev.github.io/task-manager-admin/admin/reset-password?type=recovery",
    });

  if (error) throw error;

  return {
    message: "Password reset link sent successfully.",
  };
};