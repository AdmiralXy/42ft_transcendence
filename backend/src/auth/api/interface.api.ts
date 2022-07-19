export interface InterfaceAPI {
  exchangeCodeToToken(code: string): Promise<any>;
  exchangeRefreshTokenToToken(refresh_token: string): Promise<any>;
  getUserInformation(access_token: string): Promise<any>;
}
