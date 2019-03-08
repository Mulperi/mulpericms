"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const uuid = require("uuid/v4");
const moment = require("moment");
const jwt_verify_middleware_1 = require("./../middleware/jwt-verify.middleware");
const comment_service_1 = require("../services/comment.service");
const commentService = new comment_service_1.default();
const comments = express.Router();
/**
 * Controllers object
 * Routes point to these functions
 */
const controllers = {
    getAll: (req, res) => {
        commentService.getAllComments().subscribe(data => {
            res.status(200).json(data.Items);
        }, error => res.json(error));
    },
    getCommentsWithPostId: (req, res) => {
        commentService.getCommentsWithPostId(req.params.id).subscribe(data => {
            res.status(200).json(data.Items);
        }, error => res.status(500).json(error));
    },
    saveComment: (req, res) => {
        const item = Object.assign({}, req.body.comment, { id: uuid(), date: moment().unix() });
        commentService
            .saveComment(item)
            .subscribe(data => res.status(200).json(item), error => res.status(500).json({ error: error.message }));
    },
    deleteCommentWithId: (req, res) => {
        const postId = req.params.id.split('$')[0];
        const id = req.params.id.split('$')[1];
        commentService.deleteComment(id, postId).subscribe(data => res.status(200).json({ id, postId }), error => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
    }
};
comments.get('/', controllers.getAll);
comments.get('/:id', controllers.getCommentsWithPostId);
comments.post('/', jwt_verify_middleware_1.jwtVerify, controllers.saveComment);
comments.delete('/:id', jwt_verify_middleware_1.jwtVerify, controllers.deleteCommentWithId);
exports.default = comments;
//# sourceMappingURL=comments.js.map