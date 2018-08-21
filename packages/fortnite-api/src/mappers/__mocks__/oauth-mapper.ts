import { OAuthTokenResponse, OAuthExchangeResponse } from '../../auth/responses';
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

export const mapLauncherTokenToAccessToken = (response: OAuthTokenResponse): string => accessToken;
export const mapExchangeTokenToExchangeCode = (response: OAuthExchangeResponse): string => exchangeCode;
export const mapFortniteTokenToAuthData = (response: OAuthTokenResponse): AuthData => authData;
export const mapRefreshTokenToRefreshData = (response: OAuthTokenResponse): AuthRefreshData => authRefreshData;
