import { supabase } from "../lib/supabase";

// Get Vision
export const getVision = async () => {
  const { data, error } = await supabase
    .from("vision")
    .select("*")
    .single();

  if (error) throw error;

  return data;
};

// Update Vision
export const updateVision = async (
  id: string,
  body: any
) => {
  const { data, error } = await supabase
    .from("vision")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};