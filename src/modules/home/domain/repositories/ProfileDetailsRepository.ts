import type { ProfileCompletion } from '@/modules/home/domain/entities/ProfileDetails';

export interface ProfileDetailsRepository {
  loadProfileCompletion(): Promise<ProfileCompletion>;
}
