import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/components/command/pages';
export const Route = createFileRoute('/login')({
  head: () => ({ meta: [
    { title: 'Secure Operator Login — CrowdGuard AI' },
    { name: 'description', content: 'Operator access to the CrowdGuard AI crowd monitoring and safety command center.' },
    { property: 'og:title', content: 'Secure Operator Login — CrowdGuard AI' },
    { property: 'og:description', content: 'Operator access to the CrowdGuard AI crowd monitoring and safety command center.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LoginPage,
});
