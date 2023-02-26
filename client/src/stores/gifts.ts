import { defineStore } from "pinia";
import { ref } from "vue";

import { useGiftlistApi } from "@/composables/giftlistApi";

import type { FormGift, Gift } from "@/types/giftlist";

export const useGiftsStore = defineStore("gifts", () => {
  const gifts = ref<Gift[]>([]);
  const selectedGift = ref<Gift>();

  const { fetchApi } = useGiftlistApi();

  // HELPERS
  function getGiftIndex(giftId: string) {
    return gifts.value.findIndex((gift) => gift.id === giftId);
  }

  function formatEditedGift(giftId: string, formGift: FormGift) {
    const gift: Partial<FormGift> = { ...formGift };

    const originalGiftIndex = gifts.value.findIndex(
      (gift) => gift.id === giftId
    );
    if (originalGiftIndex >= 0) {
      const originalGift = gifts.value[originalGiftIndex];

      if (formGift.title === originalGift.title) delete gift.title;
      if (formGift.category === originalGift.category) delete gift.category;
      if (formGift.isFavorite === originalGift.isFavorite)
        delete gift.isFavorite;
      if (formGift.isHidden === originalGift.isHidden) delete gift.isHidden;
      if (formGift.price === originalGift.price) delete gift.price;
      if (formGift.linkURL === originalGift.linkURL) delete gift.linkURL;
      if (formGift.brand === originalGift.brand) delete gift.brand;
      if (formGift.color === originalGift.color) delete gift.color;
      if (formGift.size === originalGift.size) delete gift.size;
      if (formGift.comments === originalGift.comments) delete gift.comments;
    }

    return gift;
  }

  // PUBLIC
  function reset() {
    gifts.value = [];
  }

  function selectGift(giftId: string) {
    const giftIndex = gifts.value.findIndex((gift) => gift.id === giftId);
    selectedGift.value = giftIndex < 0 ? undefined : gifts.value[giftIndex];
  }

  function unselectGift() {
    selectedGift.value = undefined;
  }

  function getGifts(listId: string) {
    fetchApi(`lists/${listId}/gifts`).then((fetchedGifts: Gift[]) => {
      gifts.value = fetchedGifts;
    });
  }

  function getGift(listId: string, giftId: string) {
    return fetchApi(`lists/${listId}/gifts/${giftId}`).then((gift: Gift) => {
      const index = getGiftIndex(giftId);
      if (index >= 0) {
        gifts.value[index] = gift;
      } else {
        gifts.value.push(gift);
      }
      selectGift(giftId);
    });
  }

  function createGift(listId: string, formGift: FormGift) {
    const response = fetchApi(
      `lists/${listId}/gifts`,
      "POST",
      JSON.stringify(formGift)
    );
    return response.then(({ id }: { id: string }) => {
      gifts.value.push({ ...formGift, listId, id });
    });
  }

  function editGift(listId: string, giftId: string, formGift: FormGift) {
    const editedGift = formatEditedGift(giftId, formGift);
    const response = fetchApi(
      `lists/${listId}/gifts/${giftId}`,
      "PUT",
      JSON.stringify(editedGift)
    );
    return response.then(() => {
      // TODO : Update gift in state in order to avoid data mismatch
      const giftIndex = getGiftIndex(giftId);
      const updatedGift = { ...formGift, id: giftId, listId };
      if (giftIndex >= 0) {
        gifts.value[giftIndex] = updatedGift;
      } else {
        gifts.value.push(updatedGift);
      }
    });
  }

  function deleteGift(listId: string, giftId: string) {
    return fetchApi(`lists/${listId}/gifts/${giftId}`, "DELETE").then(() => {
      const index = gifts.value.findIndex((gift) => gift.id === giftId);
      if (index >= 0) {
        gifts.value.splice(index, 1);
      }
    });
  }

  function showGift(listId: string, giftId: string) {
    fetchApi(`lists/${listId}/gifts/${giftId}/unhide`, "PUT").then(() => {
      const giftIndex = getGiftIndex(giftId);
      if (giftIndex >= 0) {
        gifts.value[giftIndex].isHidden = false;
      }
    });
  }

  function hideGift(listId: string, giftId: string) {
    fetchApi(`lists/${listId}/gifts/${giftId}/hide`, "PUT").then(() => {
      const giftIndex = getGiftIndex(giftId);
      if (giftIndex >= 0) {
        gifts.value[giftIndex].isHidden = true;
      }
    });
  }

  function favGift(listId: string, giftId: string) {
    fetchApi(`lists/${listId}/gifts/${giftId}/fav`, "PUT").then(() => {
      const giftIndex = getGiftIndex(giftId);
      if (giftIndex >= 0) {
        gifts.value[giftIndex].isFavorite = true;
      }
    });
  }

  function unfavGift(listId: string, giftId: string) {
    fetchApi(`lists/${listId}/gifts/${giftId}/unfav`, "PUT").then(() => {
      const giftIndex = getGiftIndex(giftId);
      if (giftIndex >= 0) {
        gifts.value[giftIndex].isFavorite = false;
      }
    });
  }

  function bookGift(listId: string, giftId: string) {
    return fetchApi(`lists/${listId}/gifts/${giftId}/book`, "PUT").then(() => {
      const giftIndex = getGiftIndex(giftId);
      if (giftIndex >= 0) {
        gifts.value[giftIndex].isBooked = true;
        // TODO : Query gift again to get bookedByDTO info
      }
    });
  }

  function unbookGift(listId: string, giftId: string) {
    return fetchApi(`lists/${listId}/gifts/${giftId}/unbook`, "PUT").then(
      () => {
        const giftIndex = getGiftIndex(giftId);
        if (giftIndex >= 0) {
          gifts.value[giftIndex].isBooked = false;
        }
      }
    );
  }

  return {
    gifts,
    selectedGift,
    selectGift,
    unselectGift,
    reset,
    getGift,
    getGifts,
    createGift,
    editGift,
    deleteGift,
    showGift,
    hideGift,
    favGift,
    unfavGift,
    bookGift,
    unbookGift,
  };
});
