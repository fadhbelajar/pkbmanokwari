const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ApiResponse<T = unknown> {
  data?: T;
  success?: boolean;
  error?: string;
  message?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const result = body as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(result?.error || result?.message || `HTTP ${response.status}`);
  }

  if (result?.error) {
    throw new Error(result.error);
  }

  if (result?.data !== undefined) {
    return result.data as T;
  }

  if (result?.success) {
    return result as T;
  }

  return body as T;
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint);
  },
  post<T>(endpoint: string, body: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  put<T>(endpoint: string, body: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },
  delete<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, {
      method: 'DELETE',
    });
  },
};

export function isApiConfigured(): boolean {
  return !!import.meta.env.VITE_API_BASE_URL;
}

export type { ApiResponse };
