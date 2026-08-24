import type { AppCapability, AppRole } from '@/shared/types/access';
import type { AuthSession } from '@/modules/auth/domain/entities/AuthSession';
import type { AuthSessionDto } from '@/modules/auth/infrastructure/dtos/AuthSessionDto';

const defaultRoles: AppRole[] = ['member'];
const defaultCapabilities: AppCapability[] = [
  'auth:access',
  'home:view',
  'profile:view',
];

export const authSessionMapper = {
  toDomain(dto: AuthSessionDto): AuthSession {
    const user = {
      capabilities: defaultCapabilities,
      email: dto.user.email,
      id: dto.user.id,
      roles: defaultRoles,
      ...(dto.user.firstName ? { firstName: dto.user.firstName } : {}),
      ...(dto.user.lastName ? { lastName: dto.user.lastName } : {}),
      ...(dto.user.profileImage ? { profileImage: dto.user.profileImage } : {}),
    };

    return {
      accessToken: dto.accessToken,
      user,
      ...(dto.refreshToken ? { refreshToken: dto.refreshToken } : {}),
    };
  },
};
