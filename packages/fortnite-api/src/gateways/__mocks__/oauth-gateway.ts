import { OAuthTokenResponse, OAuthExchangeResponse } from '../../types/external';

export const OAUTH_TOKEN_RESPONSE: OAuthTokenResponse = {
  access_token: 'access-token',
  expires_in: 28800,
  expires_at: '2018-08-20T09:32:40.175Z',
  token_type: 'bearer',
  refresh_token: 'refresh-token',
  refresh_expires: 1987200,
  refresh_expires_at: '2018-09-12T01:32:40.175Z',
  account_id: 'account-id',
  client_id: 'client-id',
  internal_client: true,
  client_service: 'launcher',
  lastPasswordValidation: '2018-08-20T01:32:40.175Z',
  app: 'launcher',
  in_app_id: 'in-app-id'
};

export const OAUTH_EXCHANGE_RESPONSE: OAuthExchangeResponse = {
  expiresInSeconds: 299,
  code: 'code',
  creatingClientId: 'client-id'
};

export const fetchLauncherToken = jest.fn(async () => OAUTH_TOKEN_RESPONSE);
export const fetchExchangeToken = jest.fn(async () => OAUTH_EXCHANGE_RESPONSE);
export const fetchFortniteToken = jest.fn(async () => OAUTH_TOKEN_RESPONSE);
export const fetchRefreshToken = jest.fn(async () => OAUTH_TOKEN_RESPONSE);
