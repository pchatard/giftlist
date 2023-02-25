import { defineStore } from "pinia";
import { ref } from "vue";

import { useGiftlistApi } from "@/composables/giftlistApi";

import type { FormGift, Gift } from "@/types/giftlist";

export const useGiftsStore = defineStore("gifts", () => {
  const selectedListGifts = ref<Gift[]>([]);
  const selectedGift = ref<Gift>();

  const { fetchApi } = useGiftlistApi();

  function reset() {
    selectedListGifts.value = [];
  }

  function selectGift(giftId: string) {
    const giftIndex = selectedListGifts.value.findIndex(
      (gift) => gift.id === giftId
    );

    selectedGift.value =
      giftIndex < 0 ? undefined : selectedListGifts.value[giftIndex];
  }

  function unselectGift() {
    selectedGift.value = undefined;
  }

  function getGifts(listId: string) {
    fetchApi(`lists/${listId}/gifts`).then((fetchedGifts: Gift[]) => {
      selectedListGifts.value = fetchedGifts;
    });
  }

  function createGift(listId: string, formGift: FormGift) {
    const response = fetchApi(
      `lists/${listId}/gifts`,
      "POST",
      JSON.stringify(formGift)
    );
    return response.then(({ id }: { id: string }) => {
      selectedListGifts.value.push({ ...formGift, listId, id });
    });
  }

  function deleteGift(listId: string, giftId: string) {
    fetchApi(`lists/${listId}/gifts/${giftId}`, "DELETE").then(() => {
      const index = selectedListGifts.value.findIndex(
        (gift) => gift.id === giftId
      );
      if (index >= 0) {
        selectedListGifts.value.splice(index, 1);
      }
    });
  }

  return {
    selectedListGifts,
    selectedGift,
    selectGift,
    unselectGift,
    reset,
    getGifts,
    createGift,
    deleteGift,
  };
});
