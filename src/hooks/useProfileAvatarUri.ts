import { useMemo } from 'react';

import { useAppSelector } from '@/app/providers/state/hooks';
import { useAuthSession } from '@/modules/auth';
import { selectHomeProfileImageUrl } from '@/store/slices/homeSlice';
import { toAbsoluteAssetUrl } from '@/shared/utils/toAbsoluteAssetUrl';

export const useProfileAvatarUri = (): string => {
  const { user } = useAuthSession();
  const homeProfileImageUrl = useAppSelector(selectHomeProfileImageUrl);

  return useMemo(() => {
    const homeImage = homeProfileImageUrl?.trim();
    if (homeImage) {
      return toAbsoluteAssetUrl(homeImage);
    }

    const authImage = user?.profileImage?.trim();
    if (authImage) {
      return toAbsoluteAssetUrl(authImage);
    }

    return '';
  }, [homeProfileImageUrl, user?.profileImage]);
};
