import { supabase } from "../lib/supabase";

// Get All Goals
export const getGoals = async () => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Create Goal
export const createGoal = async (body: any) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([body])
    .select()
    .single();

  if (error) throw error;

  return data;
};