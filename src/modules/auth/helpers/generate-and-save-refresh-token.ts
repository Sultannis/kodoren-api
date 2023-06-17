import { JwtService } from '@nestjs/jwt';
import { AdminRefreshToken } from 'src/common/entities/admin-refresh-token.entity';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';
import { appConfig } from 'src/config/app.config';
import { Repository } from 'typeorm';

export const generateAndSaveUserRefreshToken = async (
  userId: number,
  jwtService: JwtService,
  refreshTokensRepository: Repository<UserRefreshToken>,
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

export const generateAndSaveAdminRefreshToken = async (
  adminId: number,
  jwtService: JwtService,
  refreshTokensRepository: Repository<AdminRefreshToken>,
): Promise<string> => {
  const refreshToken = await jwtService.signAsync({ id: adminId, isRefreshToken: true, isAdmin: true });

  const adminRefreshTokenRecord = refreshTokensRepository.create({
    adminId,
    token: refreshToken,
  });

  await refreshTokensRepository.save(adminRefreshTokenRecord);

  return refreshToken;
};
