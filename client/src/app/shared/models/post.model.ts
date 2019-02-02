export interface PostDTO {
  id: string;
  date: number;
  author: string;
  body: string;
  tags: string[];
}

export interface PostVO {
  id: string;
  date: string;
  author: string;
  body: string;
  tags: string[];
}
