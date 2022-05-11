import React from "react";

export interface IPaste {
  paste_title?: string;
  paste_content: string;
}
export interface IPasteFullDetails extends IPaste {
  paste_date: string;
  paste_id: number;
}
export interface IFullPastePost extends IPasteFullDetails {
  setSelectedPost: React.Dispatch<
    React.SetStateAction<IPasteFullDetails | undefined>
  >;
  setTenPosts: React.Dispatch<React.SetStateAction<IPasteFullDetails[]>>;
  tenPosts: IPasteFullDetails[];
}

export interface IComment {
  comment_content: string;
}
export interface ICommentFullDetails extends IComment {
  comment_date: string;
  comment_id: number;
  paste_id: number;
}
