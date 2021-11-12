export interface List {
    id: string;
    name: string;
    owner: string;
    ownerId: string;
    public: boolean;
    created_at: Date;
    modified_at: Date;
    sharingCode?: string;
    sharedWith?: string[];
}
