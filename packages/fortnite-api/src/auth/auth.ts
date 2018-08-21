import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from '../gateways';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData, mapRefreshTokenToRefreshData } from '../mappers';
import { AuthData } from './interfaces';

export class Auth {

  public static async login(username: string, password: string) {
    const launcherTokenResponse = await fetchLauncherToken(username, password);
    const accessToken = mapLauncherTokenToAccessToken(launcherTokenResponse);

    const exchangeResponse = await fetchExchangeToken(accessToken);
    const exchangeCode = mapExchangeTokenToExchangeCode(exchangeResponse);

    const forniteTokenResponse = await fetchFortniteToken(exchangeCode);
    const authData = mapFortniteTokenToAuthData(forniteTokenResponse);

    return new Auth(authData);
  }

  private accessToken: string;
  private appId: string;
  private refreshToken: string;
  private accountId: string;
  private expiresAt: Date;

  constructor(data: AuthData) {
    this.accessToken = data.accessToken;
    this.appId = data.appId;
    this.refreshToken = data.refreshToken;
    this.accountId = data.accountId;
    this.expiresAt = data.expiresAt;
  }

  private async refresh() {
    const refreshResponse = await fetchRefreshToken(this.refreshToken);
    const data = mapRefreshTokenToRefreshData(refreshResponse);

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
  }
}
