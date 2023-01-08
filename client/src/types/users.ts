import type { Ref } from "vue";

export interface UserInjectionData {
  isLoggedIn: Ref<boolean>;
  setIsLoggedIn: () => void;
}

export interface UserDTO {
  displayName: string;
  email: string;
  bookingsDTO: string[];
}
