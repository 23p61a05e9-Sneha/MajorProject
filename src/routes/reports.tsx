import { createFileRoute } from '@tanstack/react-router';
import { ReportsPage } from '@/components/command/pages';
export const Route = createFileRoute('/reports')({
  head: () => ({ meta: [
    { title: 'Monitoring Reports — CrowdGuard AI' },
    { name: 'description', content: 'Review crowd monitoring reports and export sample operational data.' },
    { property: 'og:title', content: 'Monitoring Reports — CrowdGuard AI' },
    { property: 'og:description', content: 'Review crowd monitoring reports and export sample operational data.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ReportsPage,
});
