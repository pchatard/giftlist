import type { InjectionKey } from "vue";
import type { BreadcrumbContentData, DarkModeData } from "./types";

export const darkModeInjectionKey = Symbol() as InjectionKey<DarkModeData>;
export const breadcrumbContentInjectionKey =
  Symbol() as InjectionKey<BreadcrumbContentData>;
