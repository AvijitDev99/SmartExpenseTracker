import type {
  AuthSession,
  RestoredSession,
  SignInCredentials,
} from '@/modules/auth/domain/entities/AuthSession';

export interface AuthRepository {
  deleteAccount(): Promise<void>;
  restoreSession(): Promise<RestoredSession>;
  signIn(credentials: SignInCredentials): Promise<AuthSession>;
  signOut(): Promise<void>;
}
