import type { ProfileCompletion } from '@/modules/home/domain/entities/ProfileDetails';
import type { ProfileDetailsRepository } from '@/modules/home/domain/repositories/ProfileDetailsRepository';

export class GetProfileCompletionUseCase {
  public constructor(private readonly profileDetailsRepository: ProfileDetailsRepository) {}

  public async execute(): Promise<ProfileCompletion> {
    const profileCompletion: ProfileCompletion =
      await this.profileDetailsRepository.loadProfileCompletion();

    return profileCompletion;
  }
}
