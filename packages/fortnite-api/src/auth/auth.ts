import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from './gateway';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData, mapRefreshTokenToRefreshData } from './map';

export class Auth {

  public static async login(username: string, password: string) {
    const launcherTokenResponse = await fetchLauncherToken(username, password);
    const accessToken = mapLauncherTokenToAccessToken(launcherTokenResponse);

    const exchangeResponse = await fetchExchangeToken(accessToken);
    const exchangeCode = mapExchangeTokenToExchangeCode(exchangeResponse);

    const forniteTokenResponse = await fetchFortniteToken(exchangeCode);
    const data = mapFortniteTokenToAuthData(forniteTokenResponse);

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

  private async refresh() {
    const refreshResponse = await fetchRefreshToken(this.refreshToken);
    const data = mapRefreshTokenToRefreshData(refreshResponse);

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
  }
}
