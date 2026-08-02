const API_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// Save Firebase Token
export const updateUserFCMToken = async (
  userId: string,
  token: string
) => {
  const response = await fetch(
    `${API_URL}/${userId}/fcm-token`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save FCM Token");
  }

  return response.json();
};