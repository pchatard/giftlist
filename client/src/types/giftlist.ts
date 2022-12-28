export interface UserName {
  id: string;
  displayName: string;
}

export interface List {
  id: string;
  title: string;
  sharingCode: string;
  isShared: boolean;
  description?: string;
  closureDate?: string | null;
  ownersDTO?: UserName[];
  grantedUsersDTO?: UserName[];
}

export interface Gift {
  id: string;
  title: string;
  isBooked?: boolean;
  isFavorite: boolean;
  isHidden: boolean;
  category: string;
  listId: string;
  price?: number;
  linkURL?: string;
  brand?: string;
  size?: string;
  color?: string;
  comments?: string;
}
