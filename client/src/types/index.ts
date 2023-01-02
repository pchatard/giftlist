import type { Ref } from "vue";
import type { RouteRecordName } from "vue-router";

export interface DarkModeData {
  isDarkMode: Ref<boolean>;
  setIsDarkMode: () => void;
}

export interface BreadcrumbContentPart {
  name: string | undefined | RouteRecordName;
  path: string | undefined;
}

export interface BreadcrumbContentData {
  breadcrumbContent: Ref<Array<BreadcrumbContentPart>>;
  setBreadcrumbContent: (content: Array<BreadcrumbContentPart>) => void;
  pushBreadcrumbContent: (part: BreadcrumbContentPart) => void;
}

export interface HeaderLinks {
  path: string;
  name: string;
  isActive: boolean;
  isExactActive: boolean;
}
