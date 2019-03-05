"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const AWS = require("aws-sdk");
const CONSTANTS = require("../constants");
class PostService {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({
            apiVersion: '2012-08-10',
            region: CONSTANTS.REGION_DYNAMODB
        });
    }
    getAllComments() {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS
        };
        return rxjs_1.from(this.docClient.scan(params).promise());
    }
    /**
     *  Needs global secondary index in DynamoDB
     */
    getCommentsWithPostId(postId) {
        var params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
            IndexName: CONSTANTS.DYNAMODB_TABLE_COMMENTS_POSTINDEX,
            KeyConditionExpression: 'HashKey = :hkey and RangeKey = :rkey',
            ExpressionAttributeValues: {
                ':rkey': postId,
                ':hkey': 'id'
            }
        };
        return rxjs_1.from(this.docClient.query(params).promise());
    }
    saveComment(item) {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
            Item: item
        };
        return rxjs_1.from(this.docClient.put(params).promise());
    }
    deleteComment(id, postId) {
        const params = {
            TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
            Key: {
                id,
                postId
            }
        };
        return rxjs_1.from(this.docClient.delete(params).promise()).pipe(operators_1.catchError(error => rxjs_1.throwError(rxjs_1.of(error))));
    }
}
exports.default = PostService;
//# sourceMappingURL=comment.service.js.map