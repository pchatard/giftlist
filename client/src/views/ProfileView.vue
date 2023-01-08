<script setup lang="ts">
import PageHeading from "@/components/PageHeading.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "@vue/runtime-core";

async function fetcher(
  path: string,
  body?: BodyInit,
  method?: string
) {
  const { getAccessTokenSilently } = useAuth0();

  const token = await getAccessTokenSilently();

  const host = import.meta.env.VITE_API_HOST;
  const proto = host == "localhost" ? "http" : "https";
  const port = import.meta.env.VITE_API_PORT;
  const response = await fetch(`${proto}://${host}:${port}/${path}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    body,
    method,
  });
  return await response.json();
}

const retrieve = async () => {
  const data = await fetcher("users/me");
  console.log(data);
  return data;
};

onMounted(async () => {
  await retrieve();
});
</script>

<template>
  <PageHeading>Mon compte</PageHeading>
</template>
