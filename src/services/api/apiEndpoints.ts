export const API = {
  auth: {
    login: 'v1/auth/login',
    refresh: 'v1/auth/refresh-token',
  },
  user: {
    account: 'v1/user',
    profileById: (userId: string) => `v1/user/${userId}`,
    profileDetails: 'v1/user/profile-details',
  },
};
