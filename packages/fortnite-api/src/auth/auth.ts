import { getLauncherToken, exchangeToken, getFortniteToken } from './gateway';
import { mapOAuthTokenResponseToAccessToken, mapOAuthExchangeResponseToExchangeCode, mapOAuthTokenResponseToAuthData } from './map';

export class Auth {

  public static async login(username: string, password: string) {
    const launcherTokenResponse = await getLauncherToken(username, password);
    const accessToken = mapOAuthTokenResponseToAccessToken(launcherTokenResponse);

    const exchangeResponse = await exchangeToken(accessToken);
    const exchangeCode = mapOAuthExchangeResponseToExchangeCode(exchangeResponse);

    const forniteTokenResponse = await getFortniteToken(exchangeCode);
    const data = mapOAuthTokenResponseToAuthData(forniteTokenResponse);

    return new Auth(data.accessToken, data.appId, data.refreshToken, data.accountId, data.expiresAt);
  }

  private accessToken: string;
  private appId: string;
  private refreshToken: string;
  private accountId: string;
  private expiresAt: Date;

  constructor(accessToken: string, appId: string, refreshToken: string, accountId: string, expiresAt: Date) {
    this.accessToken = accessToken;
    this.appId = appId;
    this.refreshToken = refreshToken;
    this.accountId = accountId;
    this.expiresAt = expiresAt;
  }
}
