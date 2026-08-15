import { supabase } from "../lib/supabase";



export const createProject = async (project: any) => {
  // =====================================================
  // 1. CREATE PROJECT / TASK
  // =====================================================

  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    throw error;
  }

  console.log(
    "✅ PROJECT CREATED:",
    data.project_name
  );

  // =====================================================
  // 2. GET ALL ADMINS
  // =====================================================

  const {
    data: admins,
    error: adminError,
  } = await supabase
    .from("users")
    .select("id, full_name")
    .eq("role", "admin");

  if (adminError) {
    console.error(
      "❌ Failed to get admins:",
      adminError
    );

    // Project is already created
    return data;
  }

  if (!admins || admins.length === 0) {
    console.warn(
      "⚠️ No admin users found"
    );

    return data;
  }

  console.log(
    "👨‍💼 Admins to notify:",
    admins
  );

  // =====================================================
  // 3. CREATE USER IN-APP NOTIFICATION
  // =====================================================

  const { error: userNotificationError } =
    await supabase
      .from("notifications")
      .insert([
        {
          user_id:
            data.assigned_user_id,

          task_id:
            data.id,

          title:
            "📌 New Task Assigned",

          message:
            `You have been assigned: ${data.project_name}`,

          is_read: false,
        },
      ]);

  if (userNotificationError) {
    console.error(
      "❌ User notification error:",
      userNotificationError
    );
  } else {
    console.log(
      "✅ User in-app notification created"
    );
  }

  // =====================================================
  // 4. SEND PUSH TO USER
  // =====================================================

  try {
    console.log(
      "📤 Sending new task push to user..."
    );

    const {
      data: userPushData,
      error: userPushError,
    } =
      await supabase.functions.invoke(
        "send-push-notification",
        {
          body: {
            userId:
              data.assigned_user_id,

            title:
              "📌 New Task Assigned",

            message:
              `You have been assigned: ${data.project_name}`,

            taskId:
              data.id,

            type:
              "new_task_user",
          },
        }
      );

    if (userPushError) {
      console.error(
        "❌ User push notification error:",
        userPushError
      );
    } else {
      console.log(
        "✅ User push notification sent:",
        userPushData
      );
    }

  } catch (pushError) {
    console.error(
      "❌ User push notification failed:",
      pushError
    );
  }

  // =====================================================
  // 5. CREATE ADMIN IN-APP NOTIFICATIONS
  // =====================================================

  const adminNotifications =
    admins.map((admin) => ({
      user_id:
        admin.id,

      task_id:
        data.id,

      title:
        "📌 New Task Created",

      message:
        `New task created: ${data.project_name}`,

      is_read: false,
    }));

  const {
    error: adminNotificationError,
  } = await supabase
    .from("notifications")
    .insert(
      adminNotifications
    );

  if (adminNotificationError) {
    console.error(
      "❌ Admin notification error:",
      adminNotificationError
    );
  } else {
    console.log(
      "✅ Admin in-app notifications created"
    );
  }

  // =====================================================
  // 6. SEND PUSH TO ALL ADMINS
  // =====================================================

  for (const admin of admins) {
    try {
      console.log(
        "📤 Sending new task push to admin:",
        admin.full_name
      );

      const {
        data: adminPushData,
        error: adminPushError,
      } =
        await supabase.functions.invoke(
          "send-push-notification",
          {
            body: {
              userId:
                admin.id,

              title:
                "📌 New Task Created",

              message:
                `New task created: ${data.project_name}`,

              taskId:
                data.id,

              type:
                "new_task_admin",
            },
          }
        );

      if (adminPushError) {
        console.error(
          "❌ Admin push notification error:",
          adminPushError
        );
      } else {
        console.log(
          "✅ Admin push notification sent:",
          adminPushData
        );
      }

    } catch (pushError) {
      console.error(
        "❌ Admin push notification failed:",
        pushError
      );
    }
  }

  // =====================================================
  // 7. RETURN CREATED PROJECT
  // =====================================================

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
  // =====================================================
  // 1. MARK TASK AS COMPLETED
  // =====================================================

  const { data, error } = await supabase
    .from("projects")
    .update({
      status: "Completed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  console.log(
    "✅ TASK COMPLETED:",
    data.project_name
  );

  // =====================================================
  // 2. GET USER WHO COMPLETED THE TASK
  // =====================================================

  const {
    data: assignedUser,
    error: userError,
  } = await supabase
    .from("users")
    .select("id, full_name")
    .eq("id", data.assigned_user_id)
    .maybeSingle();

  if (userError) {
    console.error(
      "❌ Failed to get assigned user:",
      userError
    );
  }

  const userName =
    assignedUser?.full_name ||
    "User";

  // =====================================================
  // 3. CREATE NOTIFICATION FOR THE USER
  // =====================================================

  const { error: userNotificationError } =
    await supabase
      .from("notifications")
      .insert([
        {
          user_id: data.assigned_user_id,
          task_id: data.id,
          title: "✅ Task Completed",
          message:
            `You completed: ${data.project_name}`,
          is_read: false,
        },
      ]);

  if (userNotificationError) {
    console.error(
      "❌ User notification error:",
      userNotificationError
    );
  } else {
    console.log(
      "✅ User in-app notification created"
    );
  }

  // =====================================================
  // 4. SEND PUSH TO USER
  // =====================================================

  try {
    console.log(
      "📤 Sending completion push to user:",
      userName
    );

    const {
      data: userPushData,
      error: userPushError,
    } =
      await supabase.functions.invoke(
        "send-push-notification",
        {
          body: {
            userId:
              data.assigned_user_id,

            title:
              "✅ Task Completed",

            message:
              `You completed: ${data.project_name}`,

            taskId: data.id,

            type:
              "task_completed_user",
          },
        }
      );

    if (userPushError) {
      console.error(
        "❌ User completion push error:",
        userPushError
      );
    } else {
      console.log(
        "✅ User completion push sent:",
        userPushData
      );
    }

  } catch (pushError) {
    console.error(
      "❌ User completion push failed:",
      pushError
    );
  }

  // =====================================================
  // 5. GET ALL ADMINS
  // =====================================================

  const {
    data: admins,
    error: adminError,
  } = await supabase
    .from("users")
    .select("id, full_name")
    .eq("role", "admin");

  if (adminError) {
    console.error(
      "❌ Failed to get admins:",
      adminError
    );

    return data;
  }

  if (!admins || admins.length === 0) {
    console.warn(
      "⚠️ No admin users found"
    );

    return data;
  }

  console.log(
    "👨‍💼 Admins to notify:",
    admins
  );

  // =====================================================
  // 6. CREATE ADMIN IN-APP NOTIFICATIONS
  // =====================================================

  const adminNotifications =
    admins.map((admin) => ({
      user_id: admin.id,

      task_id: data.id,

      title:
        "✅ Task Completed",

      message:
        `${data.project_name} was completed by ${userName}`,

      is_read: false,
    }));

  const {
    error: adminNotificationError,
  } = await supabase
    .from("notifications")
    .insert(
      adminNotifications
    );

  if (adminNotificationError) {
    console.error(
      "❌ Admin notification error:",
      adminNotificationError
    );
  } else {
    console.log(
      "✅ Admin in-app notifications created"
    );
  }

  // =====================================================
  // 7. SEND PUSH TO ALL ADMINS
  // =====================================================

  for (const admin of admins) {
    try {
      console.log(
        "📤 Sending completion push to admin:",
        admin.full_name
      );

      const {
        data: pushData,
        error: pushError,
      } =
        await supabase.functions.invoke(
          "send-push-notification",
          {
            body: {
              userId: admin.id,

              title:
                "✅ Task Completed",

              message:
                `${data.project_name} was completed by ${userName}`,

              taskId: data.id,

              type:
                "task_completed_admin",
            },
          }
        );

      if (pushError) {
        console.error(
          "❌ Admin push notification error:",
          pushError
        );
      } else {
        console.log(
          "✅ Admin push notification sent:",
          pushData
        );
      }

    } catch (pushError) {
      console.error(
        "❌ Admin push notification failed:",
        pushError
      );
    }
  }

  // =====================================================
  // 8. RETURN COMPLETED TASK
  // =====================================================

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