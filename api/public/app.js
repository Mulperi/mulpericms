'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CONSTANTS = require("./constants");
const logger_middleware_1 = require("./middleware/logger.middleware");
const app = express();
/**
 * Global middlewares
 */
app.use(bodyParser.json());
app.use(cors());
app.use(logger_middleware_1.logger);
/**
 * AWS configure
 */
AWS.config.update({
    region: CONSTANTS.REGION_AWS_CONFIG,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
app.set('port', process.env.PORT || 3000);
exports.default = app;
//# sourceMappingURL=app.js.map