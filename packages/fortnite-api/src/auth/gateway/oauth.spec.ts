import nock from 'nock';
import { OAUTH_TOKEN_ENDPOINT, OAUTH_EXCHANGE_ENDPOINT, getLauncherToken, exchangeToken, getFortniteToken } from './oauth';

const OAUTH_TOKEN_SUCCESS_RESPONSE = `{
  "access_token": "access-token-hash",
  "expires_in": 28800,
  "expires_at": "2018-08-17T14:59:39.368Z",
  "token_type": "bearer",
  "refresh_token": "refresh-token",
  "refresh_expires": 1987200,
  "refresh_expires_at": "2018-09-09T06:59:39.368Z",
  "account_id": "account-id-hash",
  "client_id": "client-id-hash",
  "internal_client": true,
  "client_service": "launcher",
  "lastPasswordValidation": "2018-08-17T06:59:39.368Z",
  "app": "launcher",
  "in_app_id": "app-id-hash"
}`;
const OAUTH_TOKEN_FAILURE_RESPONSE = `{
  "errorCode": "errors.com.epicgames.account.invalid_account_credentials",
  "errorMessage": "Sorry the account credentials you are using are invalid",
  "messageVars": [],
  "numericErrorCode": 18031,
  "originatingService": "com.epicgames.account.public",
  "intent": "prod",
  "error_description": "Sorry the account credentials you are using are invalid",
  "error": "invalid_grant"
}`;
const OAUTH_EXCHANGE_SUCCESS_RESPONSE = `{
  "expiresInSeconds": 299,
  "code": "code",
  "creatingClientId": "client-id"
}`;
const OAUTH_EXCHANGE_FAILURE_RESPONSE = `{
  "errorCode": "errors.com.epicgames.common.oauth.invalid_token",
  "errorMessage": "The OAuthToken you are using is not valid",
  "messageVars": [],
  "numericErrorCode": 1014,
  "originatingService": "com.epicgames.account.public",
  "intent": "prod"
}`;

describe('OAuth Gateway', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('getLauncherToken()', () => {
    const username = 'username';
    const password = 'password';

    beforeEach(() => {
      const url = OAUTH_TOKEN_ENDPOINT;
      interface Body {
        username: string;
        password: string;
      }

      nock(url.origin)
        .persist()
        .post(url.pathname, (body: Body) => body.username === username && body.password === password)
        .reply(200, OAUTH_TOKEN_SUCCESS_RESPONSE)
        .post(url.pathname)
        .reply(400, OAUTH_TOKEN_FAILURE_RESPONSE);
    });

    it('should match snapshot with correct username/password', async () => {
      const response = await getLauncherToken(username, password);

      expect(response).toMatchSnapshot();
    });

    it ('should fail with invalid username/password', () => {
      expect(getLauncherToken(username, 'invalid-password'))
        .rejects
        .toThrow();
    });
  });

  describe('exchangeToken()', () => {
    const accessToken = 'access-token';

    beforeEach(() => {
      const url = OAUTH_EXCHANGE_ENDPOINT;

      nock(url.origin)
        .matchHeader('authorization', `bearer ${accessToken}`)
        .get(url.pathname)
        .reply(200, OAUTH_EXCHANGE_SUCCESS_RESPONSE)
        .get(url.pathname)
        .reply(401, OAUTH_EXCHANGE_FAILURE_RESPONSE);
    });

    it('should match snapshot with valid access token', async () => {
      const response = await exchangeToken(accessToken);

      expect(response).toMatchSnapshot();
    });

    it('should fail with invalid authorization header', () => {
      expect(exchangeToken('invalid-access-token'))
        .rejects
        .toThrow();
    });
  });

  describe('getFortniteToken()', () => {
    const exchangeCode = 'exchange-code';

    beforeEach(() => {
      const url = OAUTH_TOKEN_ENDPOINT;
      interface Body {
        exchange_code: string;
      }

      nock(url.origin)
        .persist()
        .post(url.pathname, (body: Body) => body.exchange_code === exchangeCode)
        .reply(200, OAUTH_TOKEN_SUCCESS_RESPONSE)
        .post(url.pathname)
        .reply(400, OAUTH_TOKEN_FAILURE_RESPONSE);
    });

    it('should match snapshot with correct exchange code', async () => {
      const response = await getFortniteToken(exchangeCode);

      expect(response).toMatchSnapshot();
    });

    it('should fail with invalid exchange code', () => {
      expect(getFortniteToken('invalid-exchange-code'))
        .rejects
        .toThrow();
    });
  });
});
