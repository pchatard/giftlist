import type { Ref } from "vue";

export interface DarkModeData {
  isDarkMode: Ref<boolean>;
  setIsDarkMode: () => void;
}

export interface CurrentRouteNameData {
  currentRouteName: Ref<string>;
  setCurrentRouteName: (a: string) => void;
}

export interface HeaderLinks {
  path: string;
  name: string;
  isActive: boolean;
  isExactActive: boolean;
}
