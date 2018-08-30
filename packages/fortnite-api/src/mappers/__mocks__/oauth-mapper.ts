import { AuthData } from '../../types';

export const exchangeCode = 'exchange-code';
export const authData: AuthData = {
  accessToken: 'access-token',
  appId: 'app-id',
  refreshToken: 'refresh-token',
  accountId: 'account-id',
  expiresAt: new Date(2018)
};

export const mapTokenResponseToAuthData = jest.fn(() => authData);
export const mapExchangeResponseToExchangeCode = jest.fn(() => exchangeCode);
