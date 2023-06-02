import { JwtService } from '@nestjs/jwt';

export const generateAccessToken = (
  userId: number,
  jwtService: JwtService,
): Promise<string> => {
  return jwtService.signAsync({ id: userId });
};
