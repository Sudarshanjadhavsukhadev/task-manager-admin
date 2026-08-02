const API_URL = "http://localhost:5000/api/schedules";

// Create Schedule
export const createSchedule = async (schedule: any) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Get All Schedules
export const getSchedules = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Get Schedules By User
export const getSchedulesByUser = async (
  userId: string
) => {
  const response = await fetch(
    `${API_URL}/user/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// Delete Schedule
export const deleteSchedule = async (
  id: string
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};