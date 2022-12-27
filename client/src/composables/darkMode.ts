import { ref, watch } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);
  const setIsDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  watch(isDarkMode, (isDarkMode) => {
    const html = document.querySelectorAll("html")[0];

    if (isDarkMode) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  });

  return { isDarkMode, setIsDarkMode };
}
