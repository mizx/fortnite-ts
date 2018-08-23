import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken } from '../../gateways';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData } from '../../mappers';
import { Auth } from '../auth';
import { AuthData } from '../interfaces';

jest.mock('../../gateways');
jest.mock('../../mappers');

const authData: AuthData = {
  appId: 'app-id',
  accountId: 'account-id',
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  expiresAt: new Date(2018, 0, 1)
};

describe('Auth Service', () => {

  describe('Auth#login()', () => {

    it('should call all login gateways and mappers', async () => {
      const username = 'username';
      const password = 'password';
      const instance = await Auth.login(username, password);

      expect(fetchLauncherToken).toBeCalledWith(username, password);
      expect(fetchLauncherToken).toHaveBeenCalled();
      expect(mapLauncherTokenToAccessToken).toHaveBeenCalled();
      expect(fetchExchangeToken).toHaveBeenCalled();
      expect(mapExchangeTokenToExchangeCode).toHaveBeenCalled();
      expect(fetchFortniteToken).toHaveBeenCalled();
      expect(mapFortniteTokenToAuthData).toHaveBeenCalled();

      expect(instance).toBeInstanceOf(Auth);
    });
  });

  // TODO: add Auth#requestNewToken() tests
  // TODO: add Auth#checkIfTokenValid() tests
});
