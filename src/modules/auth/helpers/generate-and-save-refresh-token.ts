import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/common/entities/refresh-token.entity';
import { appConfig } from 'src/config/app.config';
import { Repository } from 'typeorm';

export const generateAndSaveRefreshToken = async (
  userId: number,
  jwtService: JwtService,
  refreshTokensRepository: Repository<RefreshToken>,
): Promise<string> => {
  const refreshToken = await jwtService.signAsync(
    { id: userId, isRefreshToken: true },
    { expiresIn: appConfig.refreshTokenExpirationTime },
  );

  const userRefreshTokenRecord = refreshTokensRepository.create({
    userId,
    token: refreshToken,
  });

  await refreshTokensRepository.save(userRefreshTokenRecord);

  return refreshToken;
};
