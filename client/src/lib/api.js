const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchApi(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json();
}

export async function postApi(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json();
}
