"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const AWS = require("aws-sdk");
const CONSTANTS = require("../constants");
class PostService {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({
            apiVersion: '2012-08-10',
            region: CONSTANTS.REGION_DYNAMODB
        });
    }
    getAllPosts() {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_POSTS
        };
        return rxjs_1.from(this.docClient.scan(params).promise());
    }
    getPost(id) {
        var params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_POSTS,
            Key: {
                id
            }
        };
        return rxjs_1.from(this.docClient.get(params).promise());
    }
    savePost(item) {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_POSTS,
            Item: item
        };
        return rxjs_1.from(this.docClient.put(params).promise());
    }
    deletePost(id) {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_POSTS,
            Key: {
                id
            }
        };
        return rxjs_1.from(this.docClient.delete(params).promise());
    }
}
exports.default = PostService;
//# sourceMappingURL=post.service.js.map