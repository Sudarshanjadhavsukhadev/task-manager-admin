import { supabase } from "../lib/supabase";

// Get all users
export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) throw error;

  return data;
};

// Save Firebase Token
export const updateUserFCMToken = async (
  userId: string,
  token: string
) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      fcm_token: token,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteUser = async (id: string) => {

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) throw error;

};