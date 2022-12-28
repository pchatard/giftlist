import type { Gift } from "@/types/giftlist";

export const gifts: Gift[] = [];
for (let i = 0; i < 20; i++) {
  const gift: Gift = {
    id: "giftId" + i,
    title: "Gift n°" + (i + 1),
    isFavorite: i < 6,
    isBooked: i % 2 == 0,
    isHidden: i % 5 == 2,
    category: "Vêtements",
    listId: "id" + (i % 3),
    price: i * 10,
    brand: "Nike",
    size: "M",
    linkURL: "https://flowbite.com/docs/typography/links/",
  };
  gifts.push(gift);
}
