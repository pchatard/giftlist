import { onMounted, ref, watch } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(true);
  const setIsDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  onMounted(() => {
    const html = document.querySelectorAll("html")[0];

    if (isDarkMode.value) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  });

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
