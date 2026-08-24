import { GetProfileCompletionUseCase } from '@/modules/home/application/use-cases/GetProfileCompletionUseCase';
import { ProfileDetailsRepositoryImpl } from '@/modules/home/infrastructure/repositories/ProfileDetailsRepositoryImpl';

const profileDetailsRepository = new ProfileDetailsRepositoryImpl();

export const homeUseCases = {
  getProfileCompletion: new GetProfileCompletionUseCase(profileDetailsRepository),
};
