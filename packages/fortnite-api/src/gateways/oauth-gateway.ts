import { get, post } from 'request-promise-native';
import { OAuthTokenResponse, OAuthExchangeResponse } from '../types/external';

import { OAUTH_TOKEN_ENDPOINT, OAUTH_EXCHANGE_ENDPOINT } from '../urls.json';

const EPIC_AUTHORIZATION = 'MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=';
const FORTNITE_AUTHORIZATION = 'ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ=';

export const fetchLauncherToken = async (username: string, password: string): Promise<OAuthTokenResponse> => {
  const headers = { authorization: `basic ${EPIC_AUTHORIZATION}` };
  const form = { username, password, grant_type: 'password', includePerms: false };
  const options = { headers, form, json: true, url: OAUTH_TOKEN_ENDPOINT };

  return await post(options);
};

export const fetchExchangeToken = async (accessToken: string): Promise<OAuthExchangeResponse> => {
  const headers = { authorization: `bearer ${accessToken}` };
  const options = { headers, json: true, url: OAUTH_EXCHANGE_ENDPOINT };

  return await get(options);
};

export const fetchFortniteToken = async (exchangeCode: string): Promise<OAuthTokenResponse> => {
  const headers = { authorization: `basic ${FORTNITE_AUTHORIZATION}` };
  const form = { exchange_code: exchangeCode, grant_type: 'exchange_code', includePerms: false, token_type: 'eg1' };
  const options = { headers, form, json: true, url: OAUTH_TOKEN_ENDPOINT };

  return await post(options);
};

export const fetchRefreshToken = async (refreshToken: string): Promise<OAuthTokenResponse> => {
  const headers = { authorization: `basic ${FORTNITE_AUTHORIZATION}` };
  const form = { grant_type: 'refresh_token', refresh_token: refreshToken, includePerms: false };
  const options = { headers, form, json: true, url: OAUTH_TOKEN_ENDPOINT };

  return await post(options);
};
