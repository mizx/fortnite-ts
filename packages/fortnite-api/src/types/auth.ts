export interface AuthData {
  appId: string;
  accountId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AuthOptions {
  refreshGrace: number;
}
