'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CONSTANTS = require("./constants");
const rp = require("request-promise");
const logger_middleware_1 = require("./middleware/logger.middleware");
var jwkToPem = require('jwk-to-pem');
const app = express();
/*
  "Global" middlewares
*/
app.use(bodyParser.json());
app.use(cors());
app.use(logger_middleware_1.logger);
/*
  AWS Configure
*/
const COGNITO_KEYS_URL = `https://cognito-idp.${CONSTANTS.REGION_AWS_CONFIG}.amazonaws.com/${CONSTANTS.COGNITO_USERPOOLID}/.well-known/jwks.json`;
let COGNITO_JWK;
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
    exports.pem = jwkToPem(COGNITO_JWK);
})
    .catch(err => console.log(err));
app.set('port', process.env.PORT || 3000);
exports.default = app;
//# sourceMappingURL=app.js.map