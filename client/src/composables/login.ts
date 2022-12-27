import { ref } from "vue";
import { useRouter } from "vue-router";

export function useLogin() {
  const isLoggedIn = ref(true);
  const router = useRouter();

  const setIsLoggedIn = () => {
    isLoggedIn.value = !isLoggedIn.value;
    if (isLoggedIn.value) {
      router.push("/app/lists");
    }
  };

  return { isLoggedIn, setIsLoggedIn };
}
