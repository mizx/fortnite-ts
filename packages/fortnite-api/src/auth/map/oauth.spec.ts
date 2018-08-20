import { OAuthTokenResponse, OAuthExchangeResponse } from '../response';
import { mapOAuthTokenResponseToAccessToken, mapOAuthExchangeResponseToExchangeCode, mapOAuthTokenResponseToAuthData } from './oauth';

const OAUTH_TOKEN_RESPONSE: OAuthTokenResponse = {
  access_token: 'access-token',
  expires_in: 28800,
  expires_at: '2018-08-20T09:32:40.175Z',
  token_type: 'bearer',
  refresh_token: 'refresh-token',
  refresh_expires: 1987200,
  refresh_expires_at: '2018-09-12T01:32:40.175Z',
  account_id: 'account-id',
  client_id: 'client-id',
  internal_client: true,
  client_service: 'launcher',
  lastPasswordValidation: '2018-08-20T01:32:40.175Z',
  app: 'launcher',
  in_app_id: 'in-app-id'
};

const OAUTH_EXCHANGE_RESPONSE: OAuthExchangeResponse = {
  expiresInSeconds: 299,
  code: 'code',
  creatingClientId: 'client-id'
};

describe('OAuth Mapper', () => {
  describe('mapOAuthTokenResponseToAccessToken()', () => {
    it('should return acccess token', () => {
      const result = mapOAuthTokenResponseToAccessToken(OAUTH_TOKEN_RESPONSE);

      expect(result).toEqual(OAUTH_TOKEN_RESPONSE.access_token);
    });
  });

  describe('mapOAuthExchangeResponseToExchangeCode()', () => {
    it('should return exchange code', () => {
      const result = mapOAuthExchangeResponseToExchangeCode(OAUTH_EXCHANGE_RESPONSE);

      expect(result).toEqual(OAUTH_EXCHANGE_RESPONSE.code);
    });
  });

  describe('mapOAuthTokenResponseToAuthConstructor()', () => {
    it('should return auth class constructor params', () => {
      const response = OAUTH_TOKEN_RESPONSE;
      const result = mapOAuthTokenResponseToAuthData(response);

      expect(result).toBeInstanceOf(Object);
      expect(result.accessToken).toEqual(response.access_token);
      expect(result.appId).toEqual(response.in_app_id);
      expect(result.refreshToken).toEqual(response.refresh_token);
      expect(result.accountId).toEqual(response.account_id);
      expect(result.expiresAt).toBeInstanceOf(Date);
    });
  });
});
