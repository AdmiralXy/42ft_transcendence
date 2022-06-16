import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IntraAPI {
  constructor(private readonly httpService: HttpService) {}

  async exchangeCodeToToken(code: string): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .post('https://api.intra.42.fr/oauth/token', {
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          redirect_uri: process.env.REDIRECT_URI,
        })
        .pipe(map((resp) => resp.data)),
    );
  }

  async getUserInformation(access_token: string): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .get('https://api.intra.42.fr/v2/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(map((resp) => resp.data)),
    );
  }
}
