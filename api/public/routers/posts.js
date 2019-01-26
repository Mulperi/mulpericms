"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt_decode = require("jwt-decode");
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
    const markdown = req.body.post;
    const username = jwt_decode(req.headers.authorization)['cognito:username'];
    postService
        .savePost(username, markdown)
        .subscribe(data => res.json(data), error => res.json({ error: error.message }));
});
exports.default = posts;
//# sourceMappingURL=posts.js.map