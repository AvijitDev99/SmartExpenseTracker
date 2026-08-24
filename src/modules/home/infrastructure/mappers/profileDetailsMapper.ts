import type { ProfileCompletion } from '@/modules/home/domain/entities/ProfileDetails';
import type { ProfileDetailsDto } from '@/modules/home/infrastructure/dtos/ProfileDetailsDto';

const clampPercentage = (value: number): number =>
  Math.max(0, Math.min(100, Math.round(value)));

const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const toText = (value: string | null | undefined): string => (typeof value === 'string' ? value.trim() : '');
const toTrustedForUserIds = (value: string[] | null | undefined): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => toText(item))
    .filter(Boolean);
};
const firstText = (...values: (string | null | undefined)[]): string => {
  for (const value of values) {
    const text = toText(value);

    if (text) {
      return text;
    }
  }

  return '';
};

const toDeceasedStatus = (...values: (string | null | undefined)[]): string => {
  for (const value of values) {
    const text = toText(value).toLowerCase();

    if (text) {
      return text;
    }
  }

  return '';
};

export const profileDetailsMapper = {
  toProfileCompletion(data: ProfileDetailsDto | null | undefined): ProfileCompletion {
    const rawPercentage = data?.profileCompletion?.percentage;
    const trustedForUserIds = toTrustedForUserIds(data?.trustedForUserIds);
    const deceasedStatus = toDeceasedStatus(data?.deceasedStatus, data?.user?.deceasedStatus);
    const profileImageUrl = firstText(
      data?.profileImage,
      data?.user?.profileImage,
      data?.user?.avatar,
      data?.user?.photo,
      data?.aboutMe?.profileImage,
      data?.aboutMe?.avatar,
    );

    return {
      hasVerifiedDeceasedStatus: deceasedStatus === 'verified',
      hasSharedWishesAccess: trustedForUserIds.length > 0,
      percentage: isNumber(rawPercentage) ? clampPercentage(rawPercentage) : 0,
      profileImageUrl,
    };
  },
};
