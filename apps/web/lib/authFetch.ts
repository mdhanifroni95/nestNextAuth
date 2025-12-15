import { refreshToken } from "./auth";
import { getSession } from "./session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  let response = await fetch(url.toString(), { ...options, headers });

  if (response.status === 401 && !session?.refreshToken) {
    const newAccessToken = await refreshToken(session?.refreshToken || "");
    console.log("Refreshed access token", newAccessToken);

    if (!newAccessToken) {
      throw new Error("Unable to refresh token");
    }
    response = await fetch(url.toString(), {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }
  return response;
};
