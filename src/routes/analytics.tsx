import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsPage } from '@/components/command/pages';
export const Route = createFileRoute('/analytics')({
  head: () => ({ meta: [
    { title: 'Crowd Analytics — CrowdGuard AI' },
    { name: 'description', content: 'Explore crowd activity, occupancy trends and camera performance.' },
    { property: 'og:title', content: 'Crowd Analytics — CrowdGuard AI' },
    { property: 'og:description', content: 'Explore crowd activity, occupancy trends and camera performance.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AnalyticsPage,
});
