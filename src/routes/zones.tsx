import { createFileRoute } from '@tanstack/react-router';
import { ZonesPage } from '@/components/command/pages';
export const Route = createFileRoute('/zones')({
  head: () => ({ meta: [
    { title: 'Zone Configuration — CrowdGuard AI' },
    { name: 'description', content: 'Manage safe capacities and occupancy alert thresholds for crowd monitoring zones.' },
    { property: 'og:title', content: 'Zone Configuration — CrowdGuard AI' },
    { property: 'og:description', content: 'Manage safe capacities and occupancy alert thresholds for crowd monitoring zones.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ZonesPage,
});
