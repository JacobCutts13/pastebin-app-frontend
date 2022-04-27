export interface IPaste {
  paste_title?: string;
  paste_content: string;
}
export interface IPasteFullDetails extends IPaste {
  paste_date: string;
  paste_id: number;
}
