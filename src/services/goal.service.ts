import { supabase } from "../lib/supabase";

// ==========================
// Get All Goals
// ==========================
export const getGoals = async () => {
  const { data, error } = await supabase
    .from("vision_goals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// ==========================
// Create Goal
// ==========================
export const createGoal = async (body: any) => {
  const { data, error } = await supabase
    .from("vision_goals")
    .insert([body])
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ==========================
// Update Goal
// ==========================
export const updateGoal = async (
  id: string,
  body: any
) => {
  const { data, error } = await supabase
    .from("vision_goals")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ==========================
// Delete Goal
// ==========================
export const deleteGoal = async (id: string) => {
  const { error } = await supabase
    .from("vision_goals")
    .delete()
    .eq("id", id);

  if (error) throw error;
};