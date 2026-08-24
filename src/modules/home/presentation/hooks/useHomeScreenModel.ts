import { useEffect } from 'react';

import { toAuthenticatedUserViewModel, useAuthSession } from '@modules/auth';
import {
  loadHomeRequested,
  selectHomeInsightCards,
  selectHomeStatus,
} from '@/store/slices/homeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { toHomeInsightCardViewModel } from '../mappers/toHomeInsightCardViewModel';

export const useHomeScreenModel = () => {
  const dispatch = useAppDispatch();
  const { signOut, user } = useAuthSession();
  const insightCards = useAppSelector(selectHomeInsightCards);
  const status = useAppSelector(selectHomeStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadHomeRequested());
    }
  }, [dispatch, status]);

  return {
    insightCards: insightCards.map(toHomeInsightCardViewModel),
    signOut,
    user: toAuthenticatedUserViewModel(user),
  };
};
