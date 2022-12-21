import type { Ref } from "vue";

export interface UserInjectionData {
  isLoggedIn: Ref<boolean>;
  setIsLoggedIn: () => void;
}
