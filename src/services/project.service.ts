import { supabase } from "../lib/supabase";



export const createProject = async (project: any) => {
  // Create Project
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Save Notification
  const { error: notificationError } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: data.assigned_user_id,
        task_id: data.id,
        title: "📌 New Task Assigned",
        message: `You have been assigned: ${data.project_name}`,
        is_read: false,
      },
    ]);

  if (notificationError) {
    console.error("Notification Error:", notificationError);
    throw notificationError;
  }

  return data;
};

export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
};

export const getProjectsByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("assigned_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const completeTask = async (id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .update({
     status: "Completed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
};