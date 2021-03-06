import { Observable, from, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
      KeyConditionExpression: 'postId = :hkey',
      ExpressionAttributeValues: {
        ':hkey': postId
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

  deleteComment(id: string, postId: string): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_COMMENTS,
      Key: {
        id,
        postId
      }
    };
    return from(this.docClient.delete(params).promise()).pipe(
      catchError(error => throwError(of(error)))
    );
  }
}
