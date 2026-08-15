import { supabase } from "../lib/supabase";


// Create Schedule
export const createSchedule = async (schedule: any) => {

  // =====================================================
  // 1. SAVE SCHEDULE
  // =====================================================

  const { data, error } = await supabase
    .from("schedules")
    .insert([schedule])
    .select()
    .single();

  if (error) {
    throw error;
  }

  console.log("Schedule created:", data);


  // =====================================================
  // 2. SEND IMMEDIATE PUSH TO SELECTED USERS
  // =====================================================

  const assignedUsers = schedule.assigned_users || [];

  console.log(
    "Sending schedule notification to:",
    assignedUsers
  );


  for (const userId of assignedUsers) {

    try {

      const { data: pushData, error: pushError } =
        await supabase.functions.invoke(
          "send-push-notification",
          {
            body: {
              userId: userId,

              title: "📅 New Meeting Scheduled",

              message:
                `${schedule.meeting_name} has been scheduled for ` +
                `${schedule.meeting_date} at ` +
                `${schedule.start_time}. ` +
                `Location: ${schedule.location || "Not specified"}.`,

              taskId: data.id,

              type: "schedule_created",
            },
          }
        );


      if (pushError) {

        console.error(
          "Push notification failed for user:",
          userId,
          pushError
        );

        continue;
      }


      console.log(
        "Push notification sent to:",
        userId,
        pushData
      );

    } catch (pushError) {

      console.error(
        "Push notification error for user:",
        userId,
        pushError
      );

      // IMPORTANT:
      // Do NOT fail schedule creation
      // if push notification fails.
    }
  }


  // =====================================================
  // 3. RETURN CREATED SCHEDULE
  // =====================================================

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