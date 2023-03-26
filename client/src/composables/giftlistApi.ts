import { useAuth0 } from "@auth0/auth0-vue";

export function useGiftlistApi() {
  const { getAccessTokenSilently } = useAuth0();

  const fetchApi = async (path: string, method?: string, body?: BodyInit) => {
    const token = await getAccessTokenSilently();

    const host = import.meta.env.VITE_API_HOST;
    const proto = host == "localhost" ? "http" : "https";
    const port = import.meta.env.VITE_API_PORT;
    const response = await fetch(`${proto}://${host}:${port}/${path}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body,
      method,
    });
    if (response.ok && response.status == 204) {
      return;
    } else if (!response.ok) {
      const error = await response.json();
      throw error.message;
    }
    return await response.json();
  };

  return { fetchApi };
}
