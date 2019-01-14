import * as express from 'express';
var jwt = require('jsonwebtoken');
import { pem } from '../app';

export const jwtVerify = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      pem,
      { algorithms: ['RS256'] },
      function(err, decodedToken) {
        if (err) {
          console.log(err);
          next();
        } else {
          console.log('JWT verified.', decodedToken);
            next();
        }
      }
    );
  }
};
