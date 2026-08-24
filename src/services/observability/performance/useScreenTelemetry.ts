import { useEffect } from 'react';

import { analyticsService } from '@services/observability/analytics/analyticsService';
import { performanceMonitor } from '@services/observability/performance/performanceMonitor';

import type { ObservabilityEventDefinition } from '@services/observability/events';

export const useScreenTelemetry = (
  screenName: string,
  screenEvent: ObservabilityEventDefinition,
): void => {
  useEffect(() => {
    const now = () => globalThis.performance?.now?.() ?? Date.now();
    const startedAt = now();

    analyticsService.track(screenEvent, {
      screenName,
    });

    const frameId = requestAnimationFrame(() => {
      performanceMonitor.recordScreenLoad(
        screenName,
        Math.round(now() - startedAt),
      );
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [screenEvent, screenName]);
};
