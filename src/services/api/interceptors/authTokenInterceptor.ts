import {
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios';

import { prepareApiRequestForCompliance } from '@compliance/core/interceptors/apiComplianceInterceptors';
import { sessionStorage } from '@/services/storage/sessionStorage';

export const attachAuthTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  config = await prepareApiRequestForCompliance(config);
  config.metadata = {
    ...config.metadata,
    startedAt: globalThis.performance?.now?.() ?? Date.now(),
  };

  if (config.metadata.skipAuthToken) {
    return config;
  }

  const accessToken = await sessionStorage.getAccessToken();

  if (!accessToken) {
    return config;
  }

  if (typeof config.headers?.set === 'function') {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
    return config;
  }

  const headers = new AxiosHeaders(config.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);
  config.headers = headers;

  return config;
};
