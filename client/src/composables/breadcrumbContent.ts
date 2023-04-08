import type { BreadcrumbContentData, BreadcrumbContentPart } from "@/types";
import { ref } from "vue";

export function useBreadcrumbContent(): BreadcrumbContentData {
  const breadcrumbContent = ref<Array<BreadcrumbContentPart>>([]);

  const setBreadcrumbContent = (content: Array<BreadcrumbContentPart>) => {
    // if (content.length >= 3) {
    //   content = [
    //     { name: "...", path: undefined },
    //     ...content.splice(content.length - 2),
    //   ];
    // }

    breadcrumbContent.value = content;
  };

  const pushBreadcrumbContent = (content: BreadcrumbContentPart) => {
    breadcrumbContent.value.push(content);
    setBreadcrumbContent(breadcrumbContent.value);
  };

  return { breadcrumbContent, setBreadcrumbContent, pushBreadcrumbContent };
}
