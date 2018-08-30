import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from '../gateways';
import { mapTokenResponseToAuthData, mapExchangeResponseToExchangeCode } from '../mappers';
import { AuthData, AuthOptions } from '../types';

const defaultOptions: AuthOptions = {
  tickDelay: 5 * 60 * 1000,
  refreshGrace: 1 * 1000
};

export class Auth {

  public static async login(username: string, password: string) {
    const launcherTokenResponse = await fetchLauncherToken(username, password);
    const { accessToken } = mapTokenResponseToAuthData(launcherTokenResponse);

    const exchangeResponse = await fetchExchangeToken(accessToken);
    const exchangeCode = mapExchangeResponseToExchangeCode(exchangeResponse);

    const forniteTokenResponse = await fetchFortniteToken(exchangeCode);
    const authData = mapTokenResponseToAuthData(forniteTokenResponse);

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
    const data = mapTokenResponseToAuthData(refreshResponse);

    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
  }
}
