import type { RequestInit } from 'node-fetch';

type Params = {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  token: string | undefined;
};

const API_URL = process.env.NEXT_PUBLIC_SURVEY_SERVICE_URL as string;

export const callAPI = async ({
  method = 'POST',
  body = {},
  token = '',
}: Params) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const payload: RequestInit = {
    method,
    headers,
    credentials: 'include',
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(API_URL, payload);

    const success = res.ok;

    if (!success) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.errors) {
      throw new Error(`GraphQL error: ${data.errors[0].message}`);
    }

    return data.data;
  } catch (error) {
    // TODO-improvement: -elnawawy- improve error handling using Toaster
    if (error) console.error(error);
  }
};
