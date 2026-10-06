import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/command/dashboard';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AI Crowd Safety Command Center — CrowdGuard AI' },
    { name: 'description', content: 'Real-time crowd monitoring, zone occupancy, safety alerts and AI-powered operational intelligence.' },
    { property: 'og:title', content: 'AI Crowd Safety Command Center — CrowdGuard AI' },
    { property: 'og:description', content: 'Real-time crowd monitoring, zone occupancy, safety alerts and AI-powered operational intelligence.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Dashboard,
});
