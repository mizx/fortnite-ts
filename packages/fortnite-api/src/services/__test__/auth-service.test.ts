import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken } from '../../gateways';
import { mapTokenResponseToAuthData, mapExchangeResponseToExchangeCode } from '../../mappers';
import { Auth } from '../auth-service';
import { AuthData } from '../../types';

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
      expect(mapTokenResponseToAuthData).toHaveBeenCalledTimes(2);
      expect(fetchExchangeToken).toHaveBeenCalled();
      expect(mapExchangeResponseToExchangeCode).toHaveBeenCalled();
      expect(fetchFortniteToken).toHaveBeenCalled();

      expect(instance).toBeInstanceOf(Auth);
    });
  });

  // TODO: add Auth#requestNewToken() tests
  // TODO: add Auth#checkIfTokenValid() tests
});
