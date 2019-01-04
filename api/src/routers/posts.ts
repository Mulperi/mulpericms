import * as AWS from 'aws-sdk';
import * as express from 'express';

const posts: express.Router = express.Router();

const TABLENAME: string = 'mulpericms-posts';

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

posts.get('/', (req: express.Request, res: express.Response) => {
  console.log('GET: posts');

  var params = {
    TableName: TABLENAME
  };

  docClient.scan(params, (error, data) => {
    if (error) res.json(error);
    else res.json(data.Items);
  });
});

posts.get('/:id', (req: express.Request, res: express.Response) => {
  console.log('GET: posts/:id');

  var params = {
    TableName: TABLENAME,
    Key: {
      id: req.params.id
    }
  };

  docClient.get(params, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.Item);
    }
  });
});

export default posts;
