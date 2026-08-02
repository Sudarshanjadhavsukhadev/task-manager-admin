const API_URL = "http://localhost:5000/api/goals";

export const getGoals = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  return response.json();
};

export const createGoal = async (body: any) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create goal");
  }

  return response.json();
};