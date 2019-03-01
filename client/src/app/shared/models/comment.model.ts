export interface CommentDTO {
  id: string;
  postId: string;
  date: number;
  author: string;
  body: string;
}

export interface CommentVO {
  id: string;
  date: string;
  author: string;
  body: string;
}
