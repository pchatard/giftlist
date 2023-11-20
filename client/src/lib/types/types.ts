export type User = {
  img?: string;
  imgAlt?: string;
  firstName: string;
  lastName: string;
};

export type Gift = {
  title: string;
  category: string;
  isFavorite: boolean;
  isOwner: boolean;
  price?: string;
  image?: string;
  status?: "Réservé" | "Disponible" | "En cours" | "Complet";
  link?: string;
  options?: string[];
  budget?: {
    goal: number;
    current: number;
  };
};
