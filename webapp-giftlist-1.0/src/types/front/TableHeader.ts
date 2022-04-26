export interface TableHeader {
	title: string;
	width?: string;
	sortable: boolean;
	sorted?: "up" | "down" | "none";
}
