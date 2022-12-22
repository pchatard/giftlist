import type { InjectionKey } from "vue";
import type { DarkModeData } from "./types";
import type { UserInjectionData } from "./types/users";

export const userInjectionKey = Symbol() as InjectionKey<UserInjectionData>;
export const darkModeInjectionKey = Symbol() as InjectionKey<DarkModeData>;
