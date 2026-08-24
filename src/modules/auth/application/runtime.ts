import { AuthRepositoryImpl } from '@/modules/auth/infrastructure/repositories/AuthRepositoryImpl';

import { DeleteAccountUseCase } from './use-cases/DeleteAccountUseCase';
import { LoginUserUseCase } from './use-cases/LoginUserUseCase';
import { RestoreSessionUseCase } from './use-cases/RestoreSessionUseCase';
import { SignOutUserUseCase } from './use-cases/SignOutUserUseCase';

const authRepository = new AuthRepositoryImpl();

export const authUseCases = {
  deleteAccount: new DeleteAccountUseCase(authRepository),
  loginUser: new LoginUserUseCase(authRepository),
  restoreSession: new RestoreSessionUseCase(authRepository),
  signOutUser: new SignOutUserUseCase(authRepository),
};
