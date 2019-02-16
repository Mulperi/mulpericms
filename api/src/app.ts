'use strict';

import * as AWS from 'aws-sdk';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as CONSTANTS from './constants';
import { logger } from './middleware/logger.middleware';
const app = express();

/**
 * Global middlewares
 */
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

/**
 * AWS configure
 */
AWS.config.update({
  region: CONSTANTS.REGION_AWS_CONFIG,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.set('port', process.env.PORT || 3000);

export default app;
