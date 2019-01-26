"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = (req, res, next) => {
    console.log(req.method + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
};
//# sourceMappingURL=logger.middleware.js.map