import { createFileRoute } from '@tanstack/react-router';
import { AlertsPage } from '@/components/command/pages';
export const Route = createFileRoute('/alerts')({
  head: () => ({ meta: [
    { title: 'Alert Management — CrowdGuard AI' },
    { name: 'description', content: 'Review, acknowledge and resolve crowd safety incidents.' },
    { property: 'og:title', content: 'Alert Management — CrowdGuard AI' },
    { property: 'og:description', content: 'Review, acknowledge and resolve crowd safety incidents.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AlertsPage,
});
