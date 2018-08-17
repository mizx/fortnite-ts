import { get, post } from 'request-promise-native';
import { Endpoint } from './endpoint';
import { OAuthTokenResponse, OAuthExchangeResponse } from './responses';

const EPIC_AUTHORIZATION = 'MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=';
const FORTNITE_AUTHORIZATION = 'ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ=';

export class Auth {

  public static async login(username: string, password: string) {
    const accessToken = await this.getLauncherToken(username, password);
    const exchangeCode = await this.getFortniteToken(accessToken);
    const data = await this.getForniteAPIToken(exchangeCode);

    return new Auth(data.access_token, data.in_app_id, data.refresh_token, data.account_id, data.expires_at);
  }

  private static async getLauncherToken(username: string, password: string) {
    const headers = {
      Authorization: `basic ${EPIC_AUTHORIZATION}`
    };
    const form = {
      username,
      password,
      grant_type: 'password',
      includePerms: false
    };
    const options = {
      headers,
      form,
      json: true
    };

    const response = await post(Endpoint.EPIC_OAUTH_TOKEN, options) as OAuthTokenResponse;

    return response.access_token;
  }

  private static async getFortniteToken(accessToken: string) {
    const headers = {
      Authorization: `bearer ${accessToken}`
    };
    const options = {
      headers,
      json: true
    };

    const response = await get(Endpoint.EPIC_OAUTH_EXCHANGE, options) as OAuthExchangeResponse;

    return response.code;
  }

  private static async getForniteAPIToken(exchangeCode: string) {
    const headers = {
      Authorization: `basic ${FORTNITE_AUTHORIZATION}`
    };
    const form = {
      grant_type: 'exchange_code',
      exchange_code: exchangeCode,
      includePerms: false,
      token_type: 'eg1'
    };
    const options = {
      headers,
      form,
      json: true
    };

    return await get(Endpoint.EPIC_OAUTH_TOKEN, options) as OAuthTokenResponse;
  }

  private accessToken: string;
  private appId: string;
  private refreshToken: string;
  private accountId: string;
  private expiresAt: Date;

  constructor(accessToken: string, appId: string, refreshToken: string, accountId: string, expiresAt: string) {
    this.accessToken = accessToken;
    this.appId = appId;
    this.refreshToken = refreshToken;
    this.accountId = accountId;
    this.expiresAt = new Date(expiresAt);
  }
}
