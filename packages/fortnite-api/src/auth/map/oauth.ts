import { OAuthTokenResponse, OAuthExchangeResponse } from '../response';

export function mapOAuthTokenResponseToAccessToken(response: OAuthTokenResponse) {
  return response.access_token;
}

export function mapOAuthExchangeResponseToExchangeCode(response: OAuthExchangeResponse) {
  return response.code;
}

export function mapOAuthTokenResponseToAuthData(response: OAuthTokenResponse) {
  return {
    accessToken: response.access_token,
    appId: response.in_app_id,
    refreshToken: response.refresh_token,
    accountId: response.account_id,
    expiresAt: new Date(response.expires_at)
  };
}
