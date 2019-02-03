export interface PostDTO {
  id: string;
  date: number;
  author: string;
  title: string;
  body: string;
  tags: string[];
}

export interface PostVO {
  id: string;
  date: string;
  author: string;
  title: string;
  body: string;
  tags: string[];
}
