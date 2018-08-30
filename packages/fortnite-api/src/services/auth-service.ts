import { fetchLauncherToken, fetchExchangeToken, fetchFortniteToken, fetchRefreshToken } from '../gateways';
import { mapTokenResponseToAuthData, mapExchangeResponseToExchangeCode } from '../mappers';
import { AuthData, AuthOptions } from '../types';

const defaultOptions: AuthOptions = {
  refreshGrace: 5 * 60 * 1000
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

  private auth: AuthData;
  private refresher?: NodeJS.Timer;
  private options: AuthOptions;

  constructor(authData: AuthData, options: Partial<AuthOptions> = {}) {
    this.auth = authData;
    this.options = { ...defaultOptions, ...options };

    this.scheduleRefresh();
  }

  public close() {
    if (this.refresher) {
      clearTimeout(this.refresher);
    }
  }

  public getToken() {
    return this.auth.accessToken;
  }

  private getRefreshTimeoutDuration() {
    const now = new Date();
    const expires = this.auth.expiresAt;
    const diff = now.getTime() - expires.getTime();

    return diff - this.options.refreshGrace;
  }

  private scheduleRefresh() {
    const ms = this.getRefreshTimeoutDuration();
    this.refresher = setTimeout(() => this.requestNewToken(), ms);
  }

  // TODO: potentially move to separate refresh service
  private async requestNewToken() {
    const refreshResponse = await fetchRefreshToken(this.auth.refreshToken);
    const refreshAuthData = mapTokenResponseToAuthData(refreshResponse);

    this.auth = { ...this.auth, ...refreshAuthData };

    this.scheduleRefresh();
  }
}
