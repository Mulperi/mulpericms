import * as express from 'express';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { jwtVerify } from './../middleware/jwt-verify.middleware';
import CommentService from '../services/comment.service';

const commentService = new CommentService();
const comments: express.Router = express.Router();

/**
 * Controllers object
 * Routes point to these functions
 */
const controllers = {
  getAll: (req: express.Request, res: express.Response) => {
    commentService.getAllComments().subscribe(
      data => {
        res.status(200).json(data.Items);
      },
      error => res.json(error)
    );
  },
  getCommentsWithPostId: (req: express.Request, res: express.Response) => {
    commentService.getCommentsWithPostId(req.params.id).subscribe(
      data => {
        res.status(200).json(data.Items);
      },
      error => res.status(500).json(error)
    );
  },
  saveComment: (req: express.Request, res: express.Response) => {
    const item = {
      ...req.body.comment,
      id: uuid(),
      date: moment().unix()
    };
    commentService
      .saveComment(item)
      .subscribe(
        data => res.status(200).json(item),
        error => res.status(500).json({ error: error.message })
      );
  },
  deleteCommentWithId: (req: express.Request, res: express.Response) => {
    const postId = req.params.id.split('$')[0];
    const id = req.params.id.split('$')[1];
    commentService.deleteComment(id, postId).subscribe(
      data => res.status(200).json({ id, postId }),
      error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    );
  }
};

comments.get('/', controllers.getAll);
comments.get('/:id', controllers.getCommentsWithPostId);
comments.post('/', jwtVerify, controllers.saveComment);
comments.delete('/:id', jwtVerify, controllers.deleteCommentWithId);

export default comments;
