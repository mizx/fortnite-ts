import nock from 'nock';
import { OAUTH_TOKEN_ENDPOINT, OAUTH_EXCHANGE_ENDPOINT, fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from './oauth';

const OAUTH_TOKEN_SUCCESS_RESPONSE = `{
  "access_token": "access-token",
  "expires_in": 28800,
  "expires_at": "2018-08-17T14:59:39.368Z",
  "token_type": "bearer",
  "refresh_token": "refresh-token",
  "refresh_expires": 1987200,
  "refresh_expires_at": "2018-09-09T06:59:39.368Z",
  "account_id": "account-id",
  "client_id": "client-id",
  "internal_client": true,
  "client_service": "launcher",
  "lastPasswordValidation": "2018-08-17T06:59:39.368Z",
  "app": "launcher",
  "in_app_id": "app-id"
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

  describe('fetchLauncherToken()', () => {
    const username = 'username';
    const password = 'password';

    beforeEach(() => {
      const url = OAUTH_TOKEN_ENDPOINT;
      interface Body {
        username: string;
        password: string;
      }

      nock(url.origin)
        .post(url.pathname, (body: Body) => body.username === username && body.password === password)
        .reply(200, OAUTH_TOKEN_SUCCESS_RESPONSE)
        .post(url.pathname)
        .reply(400, OAUTH_TOKEN_FAILURE_RESPONSE);
    });

    it('should match snapshot with correct username/password', async () => {
      const response = await fetchLauncherToken(username, password);

      expect(response).toMatchSnapshot();
    });

    it ('should fail with invalid username/password', () => {
      expect(fetchLauncherToken(username, 'invalid-password'))
        .rejects
        .toThrow();
    });
  });

  describe('fetchExchangeToken()', () => {
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
      const response = await fetchExchangeToken(accessToken);

      expect(response).toMatchSnapshot();
    });

    it('should fail with invalid authorization header', () => {
      expect(fetchExchangeToken('invalid-access-token'))
        .rejects
        .toThrow();
    });
  });

  describe('fetchFortniteToken()', () => {
    const exchangeCode = 'exchange-code';

    beforeEach(() => {
      const url = OAUTH_TOKEN_ENDPOINT;
      interface Body {
        exchange_code: string;
      }

      nock(url.origin)
        .post(url.pathname, (body: Body) => body.exchange_code === exchangeCode)
        .reply(200, OAUTH_TOKEN_SUCCESS_RESPONSE)
        .post(url.pathname)
        .reply(400, OAUTH_TOKEN_FAILURE_RESPONSE);
    });

    it('should match snapshot with correct exchange code', async () => {
      const response = await fetchFortniteToken(exchangeCode);

      expect(response).toMatchSnapshot();
    });

    it('should fail with invalid exchange code', () => {
      expect(fetchFortniteToken('invalid-exchange-code'))
        .rejects
        .toThrow();
    });
  });

  describe('fetchRefreshToken()', () => {
    const refreshToken = 'refresh-token';

    beforeEach(() => {
      const url = OAUTH_TOKEN_ENDPOINT;
      interface Body {
        refresh_token: string;
      }

      nock(url.origin)
        .post(url.pathname, (body: Body) => body.refresh_token === refreshToken)
        .reply(200, OAUTH_TOKEN_SUCCESS_RESPONSE)
        .post(url.pathname)
        .reply(400, OAUTH_TOKEN_FAILURE_RESPONSE);
    });

    it('should match snapshot with correct refresh token', async () => {
      const response = await fetchRefreshToken(refreshToken);

      expect(response).toMatchSnapshot();
    });

    it('should fail with invalid refresh token', () => {
      expect(fetchRefreshToken('invalid-refresh-token'))
        .rejects
        .toThrow();
    });
  });
});
