'use strict';

import * as AWS from 'aws-sdk';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as CONSTANTS from './constants';

import * as rp from 'request-promise';
import { logger } from './middleware/logger.middleware';
var jwkToPem = require('jwk-to-pem');

const app = express();

/*
  "Global" middlewares
*/
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

/*
  AWS Configure
*/
const COGNITO_KEYS_URL = `https://cognito-idp.${
  CONSTANTS.REGION_AWS_CONFIG
}.amazonaws.com/${CONSTANTS.COGNITO_USERPOOLID}/.well-known/jwks.json`;
let COGNITO_JWK;
export let pem;

AWS.config.update({
  region: CONSTANTS.REGION_AWS_CONFIG,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/*
  Download Cognito user pool public keys for JWT verification

  keys[0] for IdTokens
  keys[1] for AccessTokens
  (apparently)
*/
rp(COGNITO_KEYS_URL)
  .then(res => {
    COGNITO_JWK = JSON.parse(res).keys[0];
    pem = jwkToPem(COGNITO_JWK);
  })
  .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000);

export default app;
