"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const app_1 = require("./app");
const posts_1 = require("./routers/posts");
const jwkToPem = require("jwk-to-pem");
const CONSTANTS = require("./constants");
/**
 * Routers
 */
app_1.default.use('/posts', posts_1.default);
/**
 * Download Cognito user pool public keys for JWT verification
 * keys[0] for IdTokens
 * keys[1] for AccessTokens
 * (apparently)
 */
const COGNITO_KEYS_URL = `https://cognito-idp.${CONSTANTS.REGION_AWS_CONFIG}.amazonaws.com/${CONSTANTS.COGNITO_USERPOOLID}/.well-known/jwks.json`;
let COGNITO_JWK;
rp(COGNITO_KEYS_URL)
    .then(res => {
    COGNITO_JWK = JSON.parse(res).keys[0];
    exports.pem = jwkToPem(COGNITO_JWK);
    /**
     * Start server after keys are downloaded
     */
    app_1.default.listen(app_1.default.get('port'), () => {
        console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });
})
    .catch(err => console.log(err));
//# sourceMappingURL=index.js.map