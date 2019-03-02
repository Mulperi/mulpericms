import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
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
        res.status(200).json(data.Item);
      },
      error => res.json(error)
    );
  },
  saveComment: (req: express.Request, res: express.Response) => {
    const comment = req.body.comment;

    const item = {
      ...req.body.comment,
      id: uuid(),
      date: moment().unix()
    };
    commentService
      .saveComment(item)
      .subscribe(
        data => res.status(200).json(item),
        error => res.json({ error: error.message })
      );
  },
  deleteCommentWithId: (req: express.Request, res: express.Response) => {
    commentService
      .deleteComment(req.params.id)
      .subscribe(
        data => res.status(200).json(req.params.id),
        error => res.json({ error: error.message })
      );
  }
};

comments.get('/', controllers.getAll);
comments.get('/:id', controllers.getCommentsWithPostId);
comments.post('/', jwtVerify, controllers.saveComment);
comments.delete('/:id', jwtVerify, controllers.deleteCommentWithId);

export default comments;
