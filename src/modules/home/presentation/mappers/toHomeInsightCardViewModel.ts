import type { HomeInsightCard } from '@modules/home/domain/HomeInsightCard';
import type { HomeInsightCardViewModel } from '@modules/home/presentation/view-models/HomeInsightCardViewModel';

export const toHomeInsightCardViewModel = (
  card: HomeInsightCard,
): HomeInsightCardViewModel => ({
  accessibilityLabel: `${card.title}. ${card.body}`,
  body: card.body,
  id: card.id,
  title: card.title,
});
