import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET', 'your-secret-key'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRATION', '24h') as any,
  },
});
