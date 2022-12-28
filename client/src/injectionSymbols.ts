import type { InjectionKey } from "vue";
import type { CurrentRouteNameData, DarkModeData } from "./types";
import type { UserInjectionData } from "./types/users";

export const userInjectionKey = Symbol() as InjectionKey<UserInjectionData>;
export const darkModeInjectionKey = Symbol() as InjectionKey<DarkModeData>;
export const currentRouteNameInjectionKey =
  Symbol() as InjectionKey<CurrentRouteNameData>;
