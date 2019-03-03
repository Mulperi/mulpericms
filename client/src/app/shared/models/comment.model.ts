export interface CommentDTO {
  id: string;
  postId: string;
  date: number;
  author: string;
  body: string;
}

export interface CommentVO {
  id: string;
  postId: string;
  date: string;
  author: string;
  body: string;
}

export interface CommentDeleteSuccessResponse {
  id: string;
  postId: string;
}
