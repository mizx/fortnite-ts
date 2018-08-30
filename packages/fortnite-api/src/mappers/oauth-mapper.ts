import { OAuthTokenResponse, OAuthExchangeResponse } from '../types/external';
import { AuthData } from '../types';

export const mapTokenResponseToAuthData = (response: OAuthTokenResponse): AuthData => {
  return {
    accessToken: response.access_token,
    appId: response.in_app_id,
    refreshToken: response.refresh_token,
    accountId: response.account_id,
    expiresAt: new Date(response.expires_at)
  };
};

export const mapExchangeResponseToExchangeCode = (response: OAuthExchangeResponse): string => {
  return response.code;
};
