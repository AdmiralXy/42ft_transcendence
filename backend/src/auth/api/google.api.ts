import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InterfaceAPI } from './interface.api';

@Injectable()
export class GoogleAPI implements InterfaceAPI {
  constructor(private readonly httpService: HttpService) {}

  async exchangeCodeToToken(code: string): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .post('https://oauth2.googleapis.com/token', {
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        })
        .pipe(map((resp) => resp.data)),
    );
  }

  async exchangeRefreshTokenToToken(refresh_token: string): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .post('https://oauth2.googleapis.com/token', {
          grant_type: 'refresh_token',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token,
        })
        .pipe(map((resp) => resp.data)),
    );
  }

  async getUserInformation(access_token: string): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(map((resp) => resp.data)),
    );
  }
}
