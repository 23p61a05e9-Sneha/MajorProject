import { createFileRoute } from '@tanstack/react-router';
import { LiveMonitoring } from '@/components/command/pages';
export const Route = createFileRoute('/live-monitoring')({
  head: () => ({ meta: [
    { title: 'Live Monitoring — CrowdGuard AI' },
    { name: 'description', content: 'Monitor Flask camera processes and view live AI zone telemetry.' },
    { property: 'og:title', content: 'Live Monitoring — CrowdGuard AI' },
    { property: 'og:description', content: 'Monitor Flask camera processes and view live AI zone telemetry.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LiveMonitoring,
});
