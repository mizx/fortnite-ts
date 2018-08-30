import { OAUTH_TOKEN_RESPONSE, OAUTH_EXCHANGE_RESPONSE } from '../../gateways/__mocks__/oauth-gateway';
import { mapTokenResponseToAuthData, mapExchangeResponseToExchangeCode } from '../oauth-mapper';

describe('OAuth Mapper', () => {
  describe('mapTokenResponseToAuthData()', () => {
    it('should return access token', () => {
      const response = OAUTH_TOKEN_RESPONSE;
      const result = mapTokenResponseToAuthData(response);

      expect(result.accessToken).toBe(response.access_token);
      expect(result.accountId).toBe(response.account_id);
      expect(result.appId).toBe(response.in_app_id);
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(result.expiresAt.toISOString()).toBe(response.expires_at);
      expect(result.refreshToken).toBe(response.refresh_token);
    });
  });

  describe('mapExchangeResponseToExchangeCode()', () => {
    it('should return exchange code', () => {
      const response = OAUTH_EXCHANGE_RESPONSE;
      const result = mapExchangeResponseToExchangeCode(response);

      expect(result).toBe(response.code);
    });
  });
});
