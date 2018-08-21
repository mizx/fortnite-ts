import { AuthData, AuthRefreshData } from '../../auth/interfaces';

const accessToken = 'access-token';
const exchangeCode = 'exchange-code';
const authData: AuthData = {
  accessToken,
  appId: 'app-id',
  refreshToken: 'refresh-token',
  accountId: 'account-id',
  expiresAt: new Date(2018)
};
const authRefreshData: AuthRefreshData = {
  accessToken: 'new-access-token',
  refreshToken: 'new-refresh-token',
  expiresAt: new Date(2019)
};

export const mapLauncherTokenToAccessToken = (): string => accessToken;
export const mapExchangeTokenToExchangeCode = (): string => exchangeCode;
export const mapFortniteTokenToAuthData = (): AuthData => authData;
export const mapRefreshTokenToRefreshData = (): AuthRefreshData => authRefreshData;
