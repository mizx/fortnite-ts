import { OAuthTokenResponse, OAuthExchangeResponse } from '../auth/responses';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData, mapRefreshTokenToRefreshData } from './oauth';

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
  describe('mapLauncherTokenToAccessToken()', () => {
    it('should return acccess token', () => {
      const result = mapLauncherTokenToAccessToken(OAUTH_TOKEN_RESPONSE);

      expect(result).toEqual(OAUTH_TOKEN_RESPONSE.access_token);
    });
  });

  describe('mapExchangeTokenToExchangeCode()', () => {
    it('should return exchange code', () => {
      const result = mapExchangeTokenToExchangeCode(OAUTH_EXCHANGE_RESPONSE);

      expect(result).toEqual(OAUTH_EXCHANGE_RESPONSE.code);
    });
  });

  describe('mapFortniteTokenToAuthData()', () => {
    it('should return auth class constructor params', () => {
      const response = OAUTH_TOKEN_RESPONSE;
      const result = mapFortniteTokenToAuthData(response);

      expect(result).toBeInstanceOf(Object);
      expect(result.accessToken).toEqual(response.access_token);
      expect(result.appId).toEqual(response.in_app_id);
      expect(result.refreshToken).toEqual(response.refresh_token);
      expect(result.accountId).toEqual(response.account_id);
      expect(result.expiresAt).toEqual(new Date(response.expires_at));
    });
  });

  describe('mapRefreshTokenToRefreshData()', () => {
    it('should return refresh data', () => {
      const response = OAUTH_TOKEN_RESPONSE;
      const result = mapRefreshTokenToRefreshData(response);

      expect(result).toBeInstanceOf(Object);
      expect(result.accessToken).toEqual(response.access_token);
      expect(result.refreshToken).toEqual(response.refresh_token);
      expect(result.expiresAt).toEqual(new Date(response.expires_at));
    });
  });
});
