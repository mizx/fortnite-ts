import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken } from '../../gateways';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData } from '../../mappers';
import { Auth } from '../auth';

jest.mock('../../gateways');
jest.mock('../../mappers');

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
});
