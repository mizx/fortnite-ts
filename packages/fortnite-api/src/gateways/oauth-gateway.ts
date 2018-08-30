import { get, post } from 'request-promise-native';
import { Headers, CoreOptions as RequestOptions } from 'request';
import { OAuthTokenResponse, OAuthExchangeResponse } from '../types/external';

import { OAUTH_TOKEN_ENDPOINT, OAUTH_EXCHANGE_ENDPOINT } from '../urls.json';
import { EPIC_AUTHORIZATION, FORTNITE_AUTHORIZATION } from '../config';

type AuthHeader = 'basic' | 'bearer';

const defaultRequestOptions: RequestOptions = {
  json: true
};
const defaultForm = {
  includePerms: false
};

function getHeaders(token: string, type: AuthHeader = 'basic'): Headers {
  return {
    authorization: `${type} ${token}`
  };
}

async function fetchToken(authorization: string, form: {}): Promise<OAuthTokenResponse> {
  const headers = getHeaders(authorization);
  const options = {
    ...defaultRequestOptions,
    headers,
    form
  };

  return post(OAUTH_TOKEN_ENDPOINT, options);
}

export const fetchLauncherToken = async (username: string, password: string): Promise<OAuthTokenResponse> => {
  const form = {
    username,
    password,
    grant_type: 'password'
  };

  return fetchToken(EPIC_AUTHORIZATION, form);
};

export const fetchExchangeToken = async (accessToken: string): Promise<OAuthExchangeResponse> => {
  const headers = getHeaders(accessToken, 'bearer');
  const options = {
    ...defaultRequestOptions,
    headers
  };

  return await get(OAUTH_EXCHANGE_ENDPOINT, options);
};

export const fetchFortniteToken = async (exchangeCode: string): Promise<OAuthTokenResponse> => {
  const form = {
    ...defaultForm,
    exchange_code: exchangeCode,
    grant_type: 'exchange_code',
    token_type: 'eg1'
  };

  return fetchToken(FORTNITE_AUTHORIZATION, form);
};

export const fetchRefreshToken = async (refreshToken: string): Promise<OAuthTokenResponse> => {
  const form = {
    ...defaultForm,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };

  return fetchToken(FORTNITE_AUTHORIZATION, form);
};
