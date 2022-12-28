import { ref } from "vue";

export function useCurrentRouteName() {
  const currentRouteName = ref("");
  const setCurrentRouteName = (name: string) => {
    currentRouteName.value = name;
  };

  return { currentRouteName, setCurrentRouteName };
}
