"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt_decode = require("jwt-decode");
const uuid = require("uuid/v4");
const moment = require("moment");
const jwt_verify_middleware_1 = require("./../middleware/jwt-verify.middleware");
const post_service_1 = require("../services/post.service");
const postService = new post_service_1.default();
const posts = express.Router();
/**
 * Controllers object
 * Routes point to these functions
 */
const controllers = {
    getAll: (req, res) => {
        postService.getAllPosts().subscribe(data => {
            res.status(200).json(data.Items);
        }, error => res.json(error));
    },
    getPostWithId: (req, res) => {
        postService.getPost(req.params.id).subscribe(data => {
            res.status(200).json(data.Item);
        }, error => res.json(error));
    },
    savePost: (req, res) => {
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
            .subscribe(data => res.status(200).json(item), error => res.json({ error: error.message }));
    },
    deletePostWithId: (req, res) => {
        postService
            .deletePost(req.params.id)
            .subscribe(data => res.status(200).json(req.params.id), error => res.json({ error: error.message }));
    }
};
posts.get('/', controllers.getAll);
posts.get('/:id', controllers.getPostWithId);
posts.post('/', jwt_verify_middleware_1.jwtVerify, controllers.savePost);
posts.delete('/:id', jwt_verify_middleware_1.jwtVerify, controllers.deletePostWithId);
exports.default = posts;
//# sourceMappingURL=posts.js.map