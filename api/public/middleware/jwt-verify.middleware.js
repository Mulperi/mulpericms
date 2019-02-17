"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
const index_1 = require("../index");
exports.jwtVerify = (req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, index_1.pem, { algorithms: ['RS256'] }, function (err, decodedToken) {
            if (err) {
                // console.log(err);
                next(err);
            }
            else {
                console.log('JWT verified.', decodedToken);
                next();
            }
        });
    }
};
//# sourceMappingURL=jwt-verify.middleware.js.map