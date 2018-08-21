import * as oauthGateway from '../../gateways';
import * as oauthMapper from '../oauth-mapper';

jest.mock('../../gateways');

describe('OAuth Mapper', () => {
  describe('mapLauncherTokenToAccessToken()', () => {
    it('should return access token', async () => {
      const response = await oauthGateway.fetchLauncherToken('', '');
      const result = oauthMapper.mapLauncherTokenToAccessToken(response);

      expect(result).toBe(response.access_token);
    });
  });

  describe('mapExchangeTokenToExchangeCode()', () => {
    it('should return exchange code', async () => {
      const response = await oauthGateway.fetchExchangeToken('');
      const result = oauthMapper.mapExchangeTokenToExchangeCode(response);

      expect(result).toBe(response.code);
    });
  });

  describe('mapFortniteTokenToAuthData()', () => {
    it('should return auth class constructor params', async () => {
      const response = await oauthGateway.fetchFortniteToken('');
      const result = oauthMapper.mapFortniteTokenToAuthData(response);

      expect(result).toBeInstanceOf(Object);
      expect(result.accessToken).toBe(response.access_token);
      expect(result.appId).toBe(response.in_app_id);
      expect(result.refreshToken).toBe(response.refresh_token);
      expect(result.accountId).toBe(response.account_id);
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(result.expiresAt.getTime()).toBe(new Date(response.expires_at).getTime());
    });
  });

  describe('mapRefreshTokenToRefreshData()', () => {
    it('should return refresh data', async () => {
      const response = await oauthGateway.fetchRefreshToken('');
      const result = oauthMapper.mapRefreshTokenToRefreshData(response);

      expect(result).toBeInstanceOf(Object);
      expect(result.accessToken).toBe(response.access_token);
      expect(result.refreshToken).toBe(response.refresh_token);
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(result.expiresAt.getTime()).toBe(new Date(response.expires_at).getTime());
    });
  });
});
