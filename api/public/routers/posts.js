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
posts.get('/', (req, res) => {
    postService.getAllPosts().subscribe(data => {
        res.json(data.Items);
    }, error => res.json(error));
});
posts.get('/:id', (req, res) => {
    postService.getPost(req.params.id).subscribe(data => {
        res.json(data.Item);
    }, error => res.json(error));
});
posts.post('/', jwt_verify_middleware_1.jwtVerify, (req, res) => {
    const post = req.body.post;
    const item = {
        id: uuid(),
        author: jwt_decode(req.headers.authorization)['cognito:username'],
        date: moment().unix(),
        body: post.body,
        tags: post.tags
    };
    postService
        .savePost(item)
        .subscribe(data => res.json(item), error => res.json({ error: error.message }));
});
posts.delete('/:id', jwt_verify_middleware_1.jwtVerify, (req, res) => {
    postService
        .deletePost(req.params.id)
        .subscribe(data => res.json(req.params.id), error => res.json({ error: error.message }));
});
exports.default = posts;
//# sourceMappingURL=posts.js.map