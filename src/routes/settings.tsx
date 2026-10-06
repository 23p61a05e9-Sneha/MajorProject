import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/command/pages';
export const Route = createFileRoute('/settings')({
  head: () => ({ meta: [
    { title: 'System Settings — CrowdGuard AI' },
    { name: 'description', content: 'Configure AI detection, alerts, camera preferences and operator account settings.' },
    { property: 'og:title', content: 'System Settings — CrowdGuard AI' },
    { property: 'og:description', content: 'Configure AI detection, alerts, camera preferences and operator account settings.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SettingsPage,
});
