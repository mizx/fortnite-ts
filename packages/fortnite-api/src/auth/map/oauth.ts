import { OAuthTokenResponse, OAuthExchangeResponse } from '../response';

export function mapLauncherTokenToAccessToken(response: OAuthTokenResponse) {
  return response.access_token;
}

export function mapExchangeTokenToExchangeCode(response: OAuthExchangeResponse) {
  return response.code;
}

export function mapFortniteTokenToAuthData(response: OAuthTokenResponse) {
  return {
    accessToken: response.access_token,
    appId: response.in_app_id,
    refreshToken: response.refresh_token,
    accountId: response.account_id,
    expiresAt: new Date(response.expires_at)
  };
}

export function mapRefreshTokenToRefreshData(response: OAuthTokenResponse) {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: new Date(response.expires_at)
  };
}
