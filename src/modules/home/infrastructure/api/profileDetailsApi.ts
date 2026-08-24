import { API } from '@/services/api/apiEndpoints';
import { apiClient } from '@/services/api/client/apiClient';
import { mapApiError } from '@/services/api/error-mapping/mapApiError';

import type { ProfileDetailsResponseDto } from '@/modules/home/infrastructure/dtos/ProfileDetailsDto';

export const profileDetailsApi = {
  async fetchProfileDetails(): Promise<ProfileDetailsResponseDto> {
    try {
      const response = await apiClient.get<ProfileDetailsResponseDto>(API.user.profileDetails, {
        headers: {
          Accept: '*/*',
        },
      });

      return response.data;
    } catch (error) {
      throw mapApiError(error);
    }
  },
};
