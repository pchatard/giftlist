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
