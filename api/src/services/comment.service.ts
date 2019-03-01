import { Observable, from } from 'rxjs';
import * as AWS from 'aws-sdk';
import * as CONSTANTS from '../constants';

export default class PostService {
  docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: CONSTANTS.REGION_DYNAMODB
  });
  constructor() {}

  getAllComments(): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS
    };
    return from(this.docClient.scan(params).promise());
  }

  /**
   *  Needs global secondary index in DynamoDB
   */
  getCommentsWithPostId(postId: string): Observable<any> {
    var params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
      IndexName: CONSTANTS.DYNAMODB_TABLE_COMMENTS_POSTINDEX,
      KeyConditionExpression: 'HashKey = :hkey and RangeKey = :rkey',
      ExpressionAttributeValues: {
        ':rkey': postId,
        ':hkey': 'id'
      }
    };
    return from(this.docClient.query(params).promise());
  }

  saveComment(item: any): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
      Item: item
    };
    return from(this.docClient.put(params).promise());
  }

  deleteComment(id: string): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
      Key: {
        id
      }
    };
    return from(this.docClient.delete(params).promise());
  }
}
