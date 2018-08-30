export interface OAuthExchangeResponse {
  expiresInSeconds: number;
  code: string;
  creatingClientId: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  expires_at: string;
  token_type: string;
  refresh_token: string;
  refresh_expires: number;
  refresh_expires_at: string;
  account_id: string;
  client_id: string;
  internal_client: boolean;
  client_service: string;
  lastPasswordValidation: string;
  app: string;
  in_app_id: string;
}
