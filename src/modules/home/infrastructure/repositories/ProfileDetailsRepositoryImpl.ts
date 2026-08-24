import type { ProfileCompletion } from '@/modules/home/domain/entities/ProfileDetails';
import type { ProfileDetailsRepository } from '@/modules/home/domain/repositories/ProfileDetailsRepository';
import { profileDetailsApi } from '@/modules/home/infrastructure/api/profileDetailsApi';
import { profileDetailsMapper } from '@/modules/home/infrastructure/mappers/profileDetailsMapper';

export class ProfileDetailsRepositoryImpl implements ProfileDetailsRepository {
  public async loadProfileCompletion(): Promise<ProfileCompletion> {
    const response = await profileDetailsApi.fetchProfileDetails();
    return profileDetailsMapper.toProfileCompletion(response.data);
  }
}
