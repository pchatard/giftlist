export interface UserName {
  id: string;
  displayName: string;
}

export interface List {
  id: string;
  title: string;
  sharingCode: string;
  isShared: boolean;
  isOwner: boolean;
  description?: string;
  closureDate?: string;
  ownersDTO?: UserName[];
  grantedUsersDTO?: UserName[];
}

export interface FormValidation {
  isError: boolean;
  errorMessage: string;
}

export interface FormList {
  title: string;
  description?: string;
  closureDate?: string | null;
  isShared: boolean;
  ownersIds: string[];
  grantedUsersIds: string[];
}

export interface FormListValidation {
  title: FormValidation;
  description: FormValidation;
  closureDate: FormValidation;
}

export interface ListInfo {
  id: string;
  title: string;
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

export interface FormGift {
  title: string;
  isFavorite: boolean;
  isHidden: boolean;
  category: string;
  price?: number;
  linkURL?: string;
  brand?: string;
  size?: string;
  color?: string;
  comments?: string;
}

export interface FormGiftValidation {
  title: FormValidation;
  category: FormValidation;
  price: FormValidation;
  linkURL: FormValidation;
  brand: FormValidation;
  size: FormValidation;
  color: FormValidation;
  comments: FormValidation;
}
