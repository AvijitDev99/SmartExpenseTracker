interface ProfileDetailsImportantPersonDto {
  name?: string | null;
  note?: string | null;
  photo?: string | null;
  relation?: string | null;
}

interface ProfileDetailsAboutMeDto {
  avatar?: string | null;
  coverImage?: string | null;
  currentLocation?: string | null;
  dateOfBirth?: string | null;
  fullName?: string | null;
  importantPeople?: ProfileDetailsImportantPersonDto[] | null;
  lifeStory?: string | null;
  momentsCaptured?: string[] | string | null;
  profileImage?: string | null;
}

interface ProfileDetailsSectionCompletionDto {
  aboutMe?: boolean | null;
  funeralPreferences?: boolean | null;
  healthcare?: boolean | null;
  legalFinancialInfo?: boolean | null;
  personalMessages?: boolean | null;
  trustedContacts?: boolean | null;
}

interface ProfileDetailsCompletionDto {
  completedSections?: number | null;
  percentage?: number | null;
  sections?: ProfileDetailsSectionCompletionDto | null;
  totalSections?: number | null;
}

interface ProfileDetailsCompletionProgressDto {
  completedSections?: number | null;
  percentage?: number | null;
  totalSections?: number | null;
}

interface ProfileDetailsUserDto {
  avatar?: string | null;
  deceasedStatus?: string | null;
  photo?: string | null;
  profileImage?: string | null;
}

interface ProfileDetailsHealthcareDto {
  additionalMedicalPreferences?: string | null;
  doNotResuscitatePreference?: string | null;
  livingWill?: string | null;
  organDonationPreference?: string | null;
  powerOfAttorneyEmail?: string | null;
  powerOfAttorneyName?: string | null;
  powerOfAttorneyPhone?: string | null;
  selectedOrgans?: string[] | null;
}

interface ProfileDetailsFuneralDto {
  burialOrCremation?: string | null;
  completionProgress?: ProfileDetailsCompletionProgressDto | null;
  customMusic?: unknown[] | null;
  selectedMusic?: unknown[] | null;
  selectedMusicIds?: string[] | null;
  totalMusic?: number | null;
}

interface ProfileDetailsLegalContactDto {
  email?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  relation?: string | null;
}

interface ProfileDetailsLegalFinancialDto {
  attorneyInformation?: ProfileDetailsLegalContactDto | null;
  bankAccounts?: string | null;
  completionProgress?: ProfileDetailsCompletionProgressDto | null;
  executor?: ProfileDetailsLegalContactDto | null;
  insurancePolicies?: string | null;
  investmentsAndAssets?: string | null;
  willLocation?: string | null;
}

interface ProfileDetailsMessageDto {
  _id?: string | null;
  messageTitle?: string | null;
  to?: string | null;
}

export interface ProfileDetailsDto {
  accountType?: string | null;
  aboutMe?: ProfileDetailsAboutMeDto | null;
  deceasedStatus?: string | null;
  email?: string | null;
  firstName?: string | null;
  fullName?: string | null;
  funeralPreferences?: ProfileDetailsFuneralDto | null;
  healthcare?: ProfileDetailsHealthcareDto | null;
  lastName?: string | null;
  legalFinancialInfo?: ProfileDetailsLegalFinancialDto | null;
  messages?: ProfileDetailsMessageDto[] | null;
  profileCompletion?: {
    percentage?: number | null;
    sections?: ProfileDetailsSectionCompletionDto | null;
  } | null;
  profileCompletionDetails?: ProfileDetailsCompletionDto | null;
  profileImage?: string | null;
  status?: string | null;
  trustedForUserIds?: string[] | null;
  trustedContacts?: unknown[] | null;
  user?: ProfileDetailsUserDto | null;
}

export interface ProfileDetailsResponseDto {
  data?: ProfileDetailsDto | null;
  message?: string;
  statusCode?: number;
}
