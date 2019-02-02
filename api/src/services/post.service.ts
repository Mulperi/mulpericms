import { Observable, from } from 'rxjs';
import * as AWS from 'aws-sdk';
import * as CONSTANTS from '../constants';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';

export default class PostService {
  docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: CONSTANTS.REGION_DYNAMODB
  });
  constructor() {}

  getAllPosts(): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_POSTS
    };
    return from(this.docClient.scan(params).promise());
  }

  getPost(id: string): Observable<any> {
    var params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_POSTS,
      Key: {
        id
      }
    };
    return from(this.docClient.get(params).promise());
  }

  savePost(item: any): Observable<any> {
    const params = {
      TableName: CONSTANTS.DYNAMODB_TABLE_POSTS,
      Item: item
    };
    return from(this.docClient.put(params).promise());
  }
}
