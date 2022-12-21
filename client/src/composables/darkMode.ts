import { ref, watch } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);
  const setIsDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  watch(isDarkMode, (isDarkMode) => {
    const app = document.getElementById("app");

    if (isDarkMode) {
      app?.classList.add("dark");
    } else {
      app?.classList.remove("dark");
    }
  });

  return { isDarkMode, setIsDarkMode };
}
