import type {
  AuthSession,
  RestoredSession,
  SignInCredentials,
} from '@/modules/auth/domain/entities/AuthSession';
import type { AuthRepository } from '@/modules/auth/domain/repositories/AuthRepository';
import { authApi } from '@/modules/auth/infrastructure/api/authApi';
import { authSessionMapper } from '@/modules/auth/infrastructure/mappers/authSessionMapper';
import { authSessionSnapshotStorage } from '@/services/storage/authSessionSnapshotStorage';
import { sessionStorage } from '@/services/storage/sessionStorage';

export class AuthRepositoryImpl implements AuthRepository {
  public deleteAccount(): Promise<void> {
    return authApi.deleteAccount();
  }

  public async restoreSession(): Promise<RestoredSession> {
    const accessToken = await sessionStorage.getAccessToken();
    const snapshot = await authSessionSnapshotStorage.get();
    const restoredUser = snapshot?.userDomain;
    const hasPreviousLogin = Boolean(accessToken);

    return {
      isAuthenticated: hasPreviousLogin,
      user:
        hasPreviousLogin && restoredUser
          ? {
              capabilities: restoredUser.capabilities as AuthSession['user']['capabilities'],
              email: restoredUser.email,
              id: restoredUser.id,
              roles: restoredUser.roles as AuthSession['user']['roles'],
              ...(restoredUser.firstName ? { firstName: restoredUser.firstName } : {}),
              ...(restoredUser.lastName ? { lastName: restoredUser.lastName } : {}),
              ...(restoredUser.profileImage ? { profileImage: restoredUser.profileImage } : {}),
            }
          : null,
    };
  }

  public async signIn(credentials: SignInCredentials): Promise<AuthSession> {
    const sessionDto = await authApi.signIn(credentials);
    const session = authSessionMapper.toDomain(sessionDto);

    const tokens = {
      accessToken: session.accessToken,
      ...(session.refreshToken ? { refreshToken: session.refreshToken } : {}),
    };

    await Promise.all([
      sessionStorage.store(tokens),
      authSessionSnapshotStorage.store({
        accessToken: session.accessToken,
        ...(session.refreshToken ? { refreshToken: session.refreshToken } : {}),
        user: sessionDto.user,
        userDomain: session.user,
      }),
    ]);

    return session;
  }

  public async signOut(): Promise<void> {
    await Promise.all([sessionStorage.clear(), authSessionSnapshotStorage.clear()]);
  }
}
