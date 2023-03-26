import { defineStore } from "pinia";
import { ref } from "vue";

import { useGiftlistApi } from "@/composables/giftlistApi";

import type { FormList, List } from "@/types/giftlist";
export const useListsStore = defineStore("lists", () => {
  const myLists = ref<List[]>([]);
  const sharedLists = ref<List[]>([]);
  const selectedList = ref<List>();

  const { fetchApi } = useGiftlistApi();

  // HELPERS
  function getListIndexInMyLists(listId: string): number {
    return myLists.value.findIndex((list) => listId === list.id);
  }

  function getListIndexInSharedLists(listId: string): number {
    return sharedLists.value.findIndex((list) => listId === list.id);
  }

  function getListById(listId: string) {
    let resultList = myLists.value.find((list) => list.id == listId);
    if (resultList) {
      return resultList;
    }

    resultList = sharedLists.value.find((list) => list.id == listId);
    return resultList ?? myLists.value[0];
  }

  function formatList(formList: FormList) {
    const list = formList;
    if (!formList.closureDate) {
      delete list.closureDate;
    }
    return list;
  }

  function formatEditedList(listId: string, formList: FormList) {
    const list: Partial<FormList> = { ...formList };
    const originalListIndex = getListIndexInMyLists(listId);
    if (originalListIndex >= 0) {
      const originalList = myLists.value[originalListIndex];

      if (formList.title === originalList.title) {
        delete list.title;
      }

      if (formList.description === originalList.description) {
        delete list.description;
      }

      if (formList.closureDate === originalList.closureDate) {
        delete list.closureDate;
      } else if (formList.closureDate == "") {
        list.closureDate = null;
      }
    }

    delete list.isShared;
    delete list.ownersIds;
    delete list.grantedUsersIds;

    return list;
  }

  // PUBLIC
  function selectList(listId: string, isSharedList: boolean) {
    if (isSharedList) {
      // Check in sharedLists
      const sharedListsIndex = getListIndexInSharedLists(listId);
      if (sharedListsIndex >= 0) {
        selectedList.value = sharedLists.value[sharedListsIndex];
        return;
      }
    } else {
      // Check in myLists
      const myListsIndex = getListIndexInMyLists(listId);
      if (myListsIndex >= 0) {
        selectedList.value = myLists.value[myListsIndex];
        return;
      }
    }

    // List not found in current store
    selectedList.value = undefined;
  }

  function unselectList() {
    selectedList.value = undefined;
  }

  function getAllLists() {
    fetchApi("lists?select=all").then((lists: List[]) => {
      myLists.value = lists.filter((list) => list.isOwner);
      sharedLists.value = lists.filter((list) => !list.isOwner);
    });
  }

  function getMyLists() {
    fetchApi("lists?select=owned").then((ownedLists: List[]) => {
      myLists.value = ownedLists;
    });
  }

  function getSharedLists() {
    fetchApi("lists?select=granted").then((grantedLists: List[]) => {
      sharedLists.value = grantedLists;
    });
  }

  function getList(listId: string) {
    return fetchApi("lists/" + listId)
      .then((fetchedList: List) => {
        selectedList.value = fetchedList;
        return fetchedList;
      })
      .then((fetchedList: List) => {
        if (fetchedList.isOwner) {
          const myListsIndex = getListIndexInMyLists(fetchedList.id);
          if (myListsIndex >= 0) {
            myLists.value[myListsIndex] = fetchedList;
          }
        } else {
          const sharedListsIndex = getListIndexInSharedLists(fetchedList.id);
          if (sharedListsIndex >= 0) {
            sharedLists.value[sharedListsIndex] = fetchedList;
          }
        }
      });
  }

  function createList(formList: FormList) {
    const newList = formatList(formList);
    const response = fetchApi("lists", "POST", JSON.stringify(newList));
    return response.then(({ id }: { id: string }) => {
      myLists.value.push({
        ...newList,
        closureDate: newList.closureDate ?? "",
        id,
        sharingCode: "",
        isOwner: true,
      });
      return id;
    });
  }

  function editList(listId: string, formList: FormList) {
    const editedList = formatEditedList(listId, formList);
    return fetchApi(`lists/${listId}`, "PUT", JSON.stringify(editedList))
      .then(() => {
        // TODO : Update selected list with new data
        return listId;
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  }

  function deleteList(listId: string) {
    return fetchApi("lists/" + listId, "DELETE")
      .then(() => {
        const listIndex = getListIndexInMyLists(listId);
        if (listIndex >= 0) {
          myLists.value.splice(listIndex, 1);
        }
      })
      .then(getMyLists)
      .catch((err) => {
        console.error(err);
      });
  }

  function shareList(listId: string) {
    fetchApi(`lists/${listId}/share`, "PUT").then(() => getList(listId));
  }

  function unshareList(listId: string) {
    fetchApi(`lists/${listId}/unshare`, "PUT").then(() => getList(listId));
  }

  function requestAccessToSharedList(sharingCode: string) {
    return fetchApi(`lists/invite/${sharingCode}`, "PUT")
      .then(({ id }: { id: string }) => {
        getList(id);
        return { listId: id };
      })
      .catch((err: string) => {
        if (err == "Unauthorized") {
          return { error: "Vous n'êtes pas autorisé à accéder à cette liste." };
        } else {
          return { error: "Le lien de partage est invalide." };
        }
      });
  }

  return {
    myLists,
    sharedLists,
    selectedList,
    selectList,
    unselectList,
    getAllLists,
    getMyLists,
    getSharedLists,
    getList,
    getListById,
    createList,
    editList,
    deleteList,
    shareList,
    unshareList,
    requestAccessToSharedList,
  };
});
