import * as rp from 'request-promise';
import * as jwkToPem from 'jwk-to-pem';
import * as CONSTANTS from './constants';
import app from './app';
import posts from './routers/posts';
import comments from './routers/comments';

/**
 * Routers
 */
app.use('/posts', posts);
app.use('/comments', comments);

/**
 * Download Cognito user pool public keys for JWT verification
 * keys[0] for IdTokens
 * keys[1] for AccessTokens
 * (apparently)
 */
const COGNITO_KEYS_URL = `https://cognito-idp.${
  CONSTANTS.REGION_AWS_CONFIG
}.amazonaws.com/${CONSTANTS.COGNITO_USERPOOLID}/.well-known/jwks.json`;
let COGNITO_JWK;
export let pem;

rp(COGNITO_KEYS_URL)
  .then(res => {
    COGNITO_JWK = JSON.parse(res).keys[0];
    pem = jwkToPem(COGNITO_JWK);

    /**
     * Start server after keys are downloaded
     */
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      );
      console.log('  Press CTRL-C to stop\n');
    });
  })
  .catch(err => console.log(err));
