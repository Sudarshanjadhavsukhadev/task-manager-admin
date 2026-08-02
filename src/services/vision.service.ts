const API_URL = "http://localhost:5000/api/vision";

export const getVision = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch vision");
  }

  return response.json();
};

export const updateVision = async (
  id: string,
  body: any
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to update vision");
  }

  return response.json();
};