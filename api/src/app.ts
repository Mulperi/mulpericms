import * as AWS from 'aws-sdk';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.set('port', process.env.PORT || 3000);

export default app;
