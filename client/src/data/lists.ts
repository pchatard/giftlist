import type { List } from "@/types/giftlist";

export const lists: List[] = [];
for (let i = 0; i < 6; i++) {
  lists.push({
    id: "id" + i,
    title: "Liste n°" + (i + 1),
    sharingCode: "id" + i,
    isShared: i % 2 == 0,
    description: i % 3 == 0 ? "Liste n°" + i + " description" : undefined,
    closureDate: "2022-12-25",
    ownersDTO: [
      { id: "user1", displayName: "User One" },
      { id: "user2", displayName: "User Two" },
    ],
    grantedUsersDTO: [
      { id: "user10", displayName: "User OneZero" },
      { id: "user20", displayName: "User TwoZero" },
      { id: "user11", displayName: "User OneOne" },
      { id: "user21", displayName: "User TwoOne" },
      { id: "user12", displayName: "User OneTwo" },
      { id: "user22", displayName: "User TwoTwo" },
    ],
  });
}
