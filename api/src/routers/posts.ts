import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { jwtVerify } from './../middleware/jwt-verify.middleware';
import PostService from '../services/post.service';

const postService = new PostService();
const posts: express.Router = express.Router();

/**
 * Controllers object
 * Routes point to these functions
 */
const controllers = {
  getAll: (req: express.Request, res: express.Response) => {
    postService.getAllPosts().subscribe(
      data => {
        res.status(200).json(data.Items);
      },
      error => res.json(error)
    );
  },
  getPostWithId: (req: express.Request, res: express.Response) => {
    postService.getPost(req.params.id).subscribe(
      data => {
        res.status(200).json(data.Item);
      },
      error => res.json(error)
    );
  },
  savePost: (req: express.Request, res: express.Response) => {
    const post = req.body.post;

    const item = {
      id: uuid(),
      author: jwt_decode(req.headers.authorization)['cognito:username'],
      date: moment().unix(),
      title: post.title,
      body: post.body,
      tags: post.tags
    };
    postService
      .savePost(item)
      .subscribe(
        data => res.status(200).json(item),
        error => res.json({ error: error.message })
      );
  },
  deletePostWithId: (req: express.Request, res: express.Response) => {
    postService
      .deletePost(req.params.id)
      .subscribe(
        data => res.status(200).json(req.params.id),
        error => res.json({ error: error.message })
      );
  }
};

posts.get('/', controllers.getAll);
posts.get('/:id', controllers.getPostWithId);
posts.post('/', jwtVerify, controllers.savePost);
posts.delete('/:id', jwtVerify, controllers.deletePostWithId);

export default posts;
