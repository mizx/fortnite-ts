import { OAuthTokenResponse, OAuthExchangeResponse } from '../auth/responses';
import { AuthData, AuthRefreshData } from '../auth/interfaces';

export const mapLauncherTokenToAccessToken = (response: OAuthTokenResponse): string => {
  return response.access_token;
};

export const mapExchangeTokenToExchangeCode = (response: OAuthExchangeResponse): string => {
  return response.code;
};

export const mapFortniteTokenToAuthData = (response: OAuthTokenResponse): AuthData => {
  return {
    accessToken: response.access_token,
    appId: response.in_app_id,
    refreshToken: response.refresh_token,
    accountId: response.account_id,
    expiresAt: new Date(response.expires_at)
  };
};

export const mapRefreshTokenToRefreshData = (response: OAuthTokenResponse): AuthRefreshData => {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: new Date(response.expires_at)
  };
};
