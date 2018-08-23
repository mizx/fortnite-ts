export interface AuthRefreshData {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AuthData extends AuthRefreshData {
  appId: string;
  accountId: string;
}

export interface AuthOptions {
  tickDelay: number;
  refreshGrace: number;
}
