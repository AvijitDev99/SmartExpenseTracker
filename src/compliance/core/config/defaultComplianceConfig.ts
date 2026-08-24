import { env } from '@config/env';

import { resolveModuleActivation } from './activationRules';

import type {
  ComplianceConfig,
  ComplianceConfigOverrides,
} from '@compliance/core/types/config';

export const buildDefaultComplianceConfig = (
  overrides: ComplianceConfigOverrides = {},
): ComplianceConfig => {
  const baseConfig: ComplianceConfig = {
    enabledModules: [],
    environment: env.appEnv,
    features: {},
  };

  const mergedConfig: ComplianceConfig = {
    ...baseConfig,
    ...overrides,
    enabledModules: overrides.enabledModules ?? baseConfig.enabledModules,
    features: {
      ...baseConfig.features,
      ...overrides.features,
    },
  };

  return {
    ...mergedConfig,
    enabledModules: resolveModuleActivation(mergedConfig),
  };
};
