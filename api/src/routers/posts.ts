import * as AWS from 'aws-sdk';
import * as express from 'express';
import * as jwt_decode from 'jwt-decode';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';

const posts: express.Router = express.Router();

const TABLENAME: string = 'mulpericms-posts';

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

posts.post('/', (req: express.Request, res: express.Response) => {
  console.log('POST: posts');

  const markdown = req.body.post;
  const username = jwt_decode(req.headers.authorization).username;

  const params = {
    TableName: TABLENAME,
    Item: {
      id: uuid(),
      author: username,
      date: moment().unix(),
      body: markdown
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      res.json({ error: err.message });
    } else {
      console.log('Post OK.');
      res.json({});
    }
  });
});

posts.get('/', (req: express.Request, res: express.Response) => {
  console.log('GET: posts');

  var params = {
    TableName: TABLENAME
  };

  docClient.scan(params, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('Got ' + data.Items.length + ' posts.');
      res.json(data.Items);
    }
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
