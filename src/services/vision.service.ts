import { supabase } from "../lib/supabase";

// =======================
// Get All Visions
// =======================
export const getVisions = async () => {
  const { data, error } = await supabase
    .from("vision")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// =======================
// Get Single Vision
// =======================
export const getVision = async (id: string) => {
  const { data, error } = await supabase
    .from("vision")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// =======================
// Create Vision
// =======================
export const createVision = async (body: any) => {
  const { data, error } = await supabase
    .from("vision")
    .insert(body)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// =======================
// Update Vision
// =======================
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

// =======================
// Delete Vision
// =======================
export const deleteVision = async (id: string) => {
  const { error } = await supabase
    .from("vision")
    .delete()
    .eq("id", id);

  if (error) throw error;
};