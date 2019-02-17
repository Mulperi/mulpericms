import { PostDTO, PostVO } from './../post.model';

export const postDTO: PostDTO = {
  id: 'string',
  date: 1,
  author: 'string',
  title: 'string',
  body: 'string',
  tags: ['string']
};
export const postVO: PostVO = {
  id: 'string',
  date: '1',
  author: 'string',
  title: 'string',
  body: 'string',
  tags: ['string']
};

export const postToBeSaved = {
  title: 'string',
  body: 'string',
  tags: ['string']
};

export const postEntities: { [id: string]: PostDTO } = { string: postDTO };
export const postIds: string[] = ['string'];

export const postDTOArray: PostDTO[] = [postDTO];
export const postVOArray: PostVO[] = [postVO];
