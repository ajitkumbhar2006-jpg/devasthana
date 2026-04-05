const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    localStorage.removeItem("token");
    return null;
  }

  const isExpired = payload.exp * 1000 <= Date.now();

  if (isExpired) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
}

async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = [data.error, data.details, data.hint].filter(Boolean).join(" | ") || fallbackMessage;

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
    }

    throw new Error(message);
  }

  return data;
}

export async function fetchApi(path) {
  const response = await fetch(`${API_URL}${path}`);
  return parseResponse(response, `Request failed for ${path}`);
}

export async function postApi(path, payload, options = {}) {
  const token = options.token ?? getAuthToken();
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, `Request failed for ${path}`);
}

export async function uploadApi(path, formData, options = {}) {
  const token = options.token ?? getAuthToken();
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData
  });
  return parseResponse(response, `Upload failed for ${path}`);
}

export async function deleteApi(path, options = {}) {
  const token = options.token ?? getAuthToken();
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return parseResponse(response, `Delete failed for ${path}`);
}

export async function putApi(path, payload, options = {}) {
  const token = options.token ?? getAuthToken();
  const response = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, `Update failed for ${path}`);
}

export { API_URL, getAuthToken };
