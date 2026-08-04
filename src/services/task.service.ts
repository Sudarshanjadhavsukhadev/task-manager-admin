import { supabase } from "../lib/supabase";

export async function createTask(data: any) {
  // Create Project (Task)
  const { data: task, error } = await supabase
    .from("projects")
    .insert([
      {
        project_name: data.title,
        description: "",
        priority: data.priority,
        status: "Pending",
        progress: 0,
        department: data.department,
        assigned_user_id: data.assignedTo,
      },
    ])
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
        user_id: task.assigned_user_id,
        task_id: task.id,
        title: "📌 New Task Assigned",
        message: `You have been assigned: ${task.project_name}`,
        is_read: false,
      },
    ]);

  if (notificationError) {
    console.error("NOTIFICATION ERROR");
    console.error(notificationError);

    alert(JSON.stringify(notificationError));

    throw notificationError;
  }

  return task;
}