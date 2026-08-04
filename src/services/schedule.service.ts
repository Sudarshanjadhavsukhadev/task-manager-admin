import { supabase } from "../lib/supabase";

// Create Schedule
export const createSchedule = async (schedule: any) => {
  const { data, error } = await supabase
    .from("schedules")
    .insert([schedule])
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Get All Schedules
export const getSchedules = async () => {
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Get Schedules By User
export const getSchedulesByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Delete Schedule
export const deleteSchedule = async (id: string) => {
  const { error } = await supabase
    .from("schedules")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return {
    message: "Schedule deleted successfully.",
  };
};