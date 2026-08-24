import type {
  SignInCredentials,
} from '@/modules/auth/domain/entities/AuthSession';
import type { AuthSessionDto } from '@/modules/auth/infrastructure/dtos/AuthSessionDto';
import { API } from '@/services/api/apiEndpoints';
import { apiClient } from '@/services/api/client/apiClient';
import { mapApiError } from '@/services/api/error-mapping/mapApiError';
import { UnknownAppError, ValidationError } from '@/shared/core/errors/AppError';

interface LoginApiUserResponse {
  _id?: string;
  accountType?: string | null;
  createdAt?: string | null;
  email?: string;
  firstName?: string;
  fullName?: string;
  id?: string;
  isEmailVerified?: boolean | null;
  isVerified?: boolean | null;
  lastName?: string;
  messages?: unknown[] | null;
  profileImage?: string | null;
  role?: {
    _id?: string | null;
    role?: string | null;
    roleDisplayName?: string | null;
  } | null;
  status?: string | null;
  userName?: string | null;
}

interface LoginApiDataResponse {
  accessToken?: string;
  expiresIn?: number;
  isVerified?: boolean | null;
  refreshToken?: string;
  user?: LoginApiUserResponse;
}

interface LoginApiResponse {
  correlationId?: string;
  data?: LoginApiDataResponse;
  message?: string;
  success?: boolean;
  statusCode?: number;
  timestamp?: string;
}

interface LoginJwtPayload {
  email?: string;
  roleId?: string;
  roleName?: string;
  sub?: string;
}

const unauthenticatedAuthRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  metadata: {
    skipAuthRefresh: true,
    skipAuthToken: true,
  },
} as const;

const hasValue = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

const getStringValue = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const decodeBase64Url = (value: string): string | null => {
  const atob = (globalThis as { atob?: (input: string) => string }).atob;

  if (!atob) {
    return null;
  }

  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = atob(padded);

    return decodeURIComponent(
      Array.from(decoded, (character) =>
        `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`,
      ).join(''),
    );
  } catch {
    return null;
  }
};

const parseJwtPayload = (token: string | undefined): LoginJwtPayload | null => {
  const [, payloadSegment] = token?.split('.') ?? [];
  const decodedPayload = payloadSegment ? decodeBase64Url(payloadSegment) : null;

  if (!decodedPayload) {
    return null;
  }

  try {
    const payload: unknown = JSON.parse(decodedPayload);

    if (!isRecord(payload)) {
      return null;
    }

    return {
      email: getStringValue(payload.email),
      roleId: getStringValue(payload.roleId),
      roleName: getStringValue(payload.roleName),
      sub: getStringValue(payload.sub),
    };
  } catch {
    return null;
  }
};

const mapLoginResponseToDto = (
  payload: LoginApiDataResponse | undefined,
  fallbackEmail: string,
): AuthSessionDto => {
  const accessToken = payload?.accessToken;
  const jwtPayload = parseJwtPayload(accessToken);
  const user = payload?.user;
  const isVerified = payload?.isVerified ?? user?.isVerified ?? user?.isEmailVerified;
  const userId = user?._id ?? user?.id ?? jwtPayload?.sub ?? fallbackEmail;
  const userEmail = user?.email ?? jwtPayload?.email ?? fallbackEmail;

  if (isVerified === false) {
    throw new ValidationError('Please verify OTP before login.', {
      details: {
        isVerified: false,
        reason: 'otp_verification_required',
      },
      userMessage: 'Please verify OTP before login.',
    });
  }

  if (!accessToken || !userId || !userEmail) {
    throw new UnknownAppError('Malformed login response.', {
      userMessage: 'Unexpected login response. Please try again.',
    });
  }

  return {
    accessToken,
    ...(payload?.refreshToken ? { refreshToken: payload.refreshToken } : {}),
    user: {
      ...(hasValue(user?.accountType) ? { accountType: user.accountType } : {}),
      ...(hasValue(user?.createdAt) ? { createdAt: user.createdAt } : {}),
      email: userEmail,
      ...(user?.firstName ? { firstName: user.firstName } : {}),
      ...(hasValue(user?.fullName) ? { fullName: user.fullName } : {}),
      id: userId,
      ...(hasValue(user?.isEmailVerified)
        ? { isEmailVerified: user.isEmailVerified }
        : {}),
      ...(user?.lastName ? { lastName: user.lastName } : {}),
      ...(hasValue(user?.messages) ? { messages: user.messages } : {}),
      ...(hasValue(user?.profileImage) ? { profileImage: user.profileImage } : {}),
      ...(hasValue(user?.role) || jwtPayload?.roleId || jwtPayload?.roleName
        ? {
            role: {
              ...(hasValue(user?.role?._id) || jwtPayload?.roleId
                ? { _id: user?.role?._id ?? jwtPayload?.roleId }
                : {}),
              ...(hasValue(user?.role?.role) || jwtPayload?.roleName
                ? { role: user?.role?.role ?? jwtPayload?.roleName }
                : {}),
              ...(hasValue(user?.role?.roleDisplayName) || jwtPayload?.roleName
                ? { roleDisplayName: user?.role?.roleDisplayName ?? jwtPayload?.roleName }
                : {}),
            },
          }
        : {}),
      ...(hasValue(user?.status) ? { status: user.status } : {}),
      ...(hasValue(user?.userName) ? { userName: user.userName } : {}),
    },
  };
};

export const authApi = {
  async deleteAccount(): Promise<void> {
    try {
      await apiClient.delete(API.user.account, {
        headers: {
          Accept: '*/*',
        },
      });
    } catch (error) {
      throw mapApiError(error);
    }
  },
  async signIn(credentials: SignInCredentials): Promise<AuthSessionDto> {
    const normalizedEmail = credentials.email.trim().toLowerCase();

    try {
      const response = await apiClient.post<LoginApiResponse>(
        API.auth.login,
        {
          email: normalizedEmail,
          password: credentials.password,
        },
        unauthenticatedAuthRequestConfig,
      );

      return mapLoginResponseToDto(response.data?.data, normalizedEmail);
    } catch (error) {
      if (error instanceof UnknownAppError || error instanceof ValidationError) {
        throw error;
      }

      throw mapApiError(error);
    }
  },
};
