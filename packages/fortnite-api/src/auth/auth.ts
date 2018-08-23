import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from '../gateways';
import { mapLauncherTokenToAccessToken, mapExchangeTokenToExchangeCode, mapFortniteTokenToAuthData, mapRefreshTokenToRefreshData } from '../mappers';
import { AuthData, AuthOptions } from './interfaces';

const defaultOptions: AuthOptions = {
  tickDelay: 5 * 60 * 1000,
  refreshGrace: 1 * 1000
};

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
  private ticker: NodeJS.Timer;
  private options: AuthOptions;

  constructor(data: AuthData, options: Partial<AuthOptions> = {}) {
    this.accessToken = data.accessToken;
    this.appId = data.appId;
    this.refreshToken = data.refreshToken;
    this.accountId = data.accountId;
    this.expiresAt = data.expiresAt;
    this.options = { ...defaultOptions, ...options };

    this.ticker = setInterval(() => this.checkIfTokenValid(), this.options.tickDelay);
  }

  public close() {
    clearInterval(this.ticker);
  }

  public getToken() {
    return this.accessToken;
  }

  private checkIfTokenValid() {
    const { refreshGrace } = this.options;
    const now = new Date();
    const expire = new Date(this.expiresAt.getTime() - refreshGrace);

    if (expire < now) {
      this.requestNewToken();
    }
  }

  // TODO: potentially move to separate refresh service
  private async requestNewToken() {
    const refreshResponse = await fetchRefreshToken(this.refreshToken);
    const data = mapRefreshTokenToRefreshData(refreshResponse);

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
  }
}
