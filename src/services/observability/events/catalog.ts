import type { ObservabilityEventDefinition } from '@services/observability/events/types';

const defineEvent = <TName extends string>(
  name: TName,
  category: ObservabilityEventDefinition<TName>['category'],
  description: string,
): ObservabilityEventDefinition<TName> => ({
  category,
  description,
  name,
});

export const observabilityEvents = {
  apiRequestCompleted: defineEvent(
    'api_request_completed',
    'api',
    'An API request completed with duration metadata.',
  ),
  apiRequestFailed: defineEvent(
    'api_request_failed',
    'api',
    'An API request failed and was mapped into an app-safe error.',
  ),
  authLoginFailed: defineEvent(
    'auth_login_failed',
    'business',
    'Authentication failed for a submitted sign-in attempt.',
  ),
  authLoginSubmitted: defineEvent(
    'auth_login_submitted',
    'user_action',
    'A user submitted the sign-in form.',
  ),
  authLoginSucceeded: defineEvent(
    'auth_login_succeeded',
    'business',
    'Authentication succeeded and a session was established.',
  ),
  authSessionRestored: defineEvent(
    'auth_session_restored',
    'runtime',
    'A secure session was restored during bootstrap.',
  ),
  authSignedOut: defineEvent(
    'auth_signed_out',
    'user_action',
    'A session was terminated by user action or policy.',
  ),
  authUnauthorized: defineEvent(
    'auth_unauthorized',
    'runtime',
    'The current session became unauthorized and local state was cleared.',
  ),
  formValidationFailed: defineEvent(
    'form_validation_failed',
    'validation',
    'A client-side or mapped server-side validation failure was shown to the user.',
  ),
  performanceApiLatencyMeasured: defineEvent(
    'performance_api_latency_measured',
    'performance',
    'API latency was measured for an outbound request.',
  ),
  performanceBootstrapMeasured: defineEvent(
    'performance_bootstrap_measured',
    'performance',
    'Application bootstrap duration was measured.',
  ),
  performanceInteractionMeasured: defineEvent(
    'performance_interaction_measured',
    'performance',
    'An interaction timing was measured.',
  ),
  performanceScreenLoadMeasured: defineEvent(
    'performance_screen_load_measured',
    'performance',
    'A screen load timing was measured.',
  ),
  runtimeAppStateChanged: defineEvent(
    'runtime_app_state_changed',
    'runtime',
    'The application lifecycle state changed.',
  ),
  runtimeBootstrapCompleted: defineEvent(
    'runtime_bootstrap_completed',
    'runtime',
    'The controlled startup pipeline completed successfully.',
  ),
  runtimeBootstrapFailed: defineEvent(
    'runtime_bootstrap_failed',
    'runtime',
    'The controlled startup pipeline failed.',
  ),
  runtimeBootstrapStarted: defineEvent(
    'runtime_bootstrap_started',
    'runtime',
    'The controlled startup pipeline began execution.',
  ),
  screenHomeViewed: defineEvent(
    'screen_home_viewed',
    'screen_view',
    'The home screen became visible.',
  ),
  screenHealthcareViewed: defineEvent(
    'screen_healthcare_viewed',
    'screen_view',
    'The healthcare screen became visible.',
  ),
  screenFuneralViewed: defineEvent(
    'screen_funeral_viewed',
    'screen_view',
    'The funeral screen became visible.',
  ),
  screenLegalFinancialViewed: defineEvent(
    'screen_legal_financial_viewed',
    'screen_view',
    'The legal and financial screen became visible.',
  ),
  screenMessageViewed: defineEvent(
    'screen_message_viewed',
    'screen_view',
    'The message screen became visible.',
  ),
  screenWrittenLetterViewed: defineEvent(
    'screen_written_letter_viewed',
    'screen_view',
    'The written letter screen became visible.',
  ),
  screenMoreViewed: defineEvent(
    'screen_more_viewed',
    'screen_view',
    'The more screen became visible.',
  ),
  screenSharedWishesViewed: defineEvent(
    'screen_shared_wishes_viewed',
    'screen_view',
    'The shared wishes screen became visible.',
  ),
  screenSharedWishesAddDeathDetailsViewed: defineEvent(
    'screen_shared_wishes_add_death_details_viewed',
    'screen_view',
    'The shared wishes add death details screen became visible.',
  ),
  screenSharedWishesAccessViewed: defineEvent(
    'screen_shared_wishes_access_viewed',
    'screen_view',
    'The shared wishes access screen became visible.',
  ),
  screenProfileViewed: defineEvent(
    'screen_profile_viewed',
    'screen_view',
    'The profile screen became visible.',
  ),
  screenSignInViewed: defineEvent(
    'screen_sign_in_viewed',
    'screen_view',
    'The sign-in screen became visible.',
  ),
  screenSummaryViewed: defineEvent(
    'screen_summary_viewed',
    'screen_view',
    'The summary screen became visible.',
  ),
  screenPrivacyPolicyViewed: defineEvent(
    'screen_privacy_policy_viewed',
    'screen_view',
    'The privacy policy screen became visible.',
  ),
  screenTermsConditionsViewed: defineEvent(
    'screen_terms_conditions_viewed',
    'screen_view',
    'The terms and conditions screen became visible.',
  ),
  screenUpgradeViewed: defineEvent(
    'screen_upgrade_viewed',
    'screen_view',
    'The upgrade screen became visible.',
  ),
  screenTrustedContactsViewed: defineEvent(
    'screen_trusted_contacts_viewed',
    'screen_view',
    'The trusted contacts screen became visible.',
  ),
} as const;

export type ObservabilityEventName =
  (typeof observabilityEvents)[keyof typeof observabilityEvents]['name'];
