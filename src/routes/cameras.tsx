import { createFileRoute } from '@tanstack/react-router';
import { CamerasPage } from '@/components/command/pages';
export const Route = createFileRoute('/cameras')({
  head: () => ({ meta: [
    { title: 'Camera Management — CrowdGuard AI' },
    { name: 'description', content: 'Configure webcam, video and CCTV sources for crowd monitoring.' },
    { property: 'og:title', content: 'Camera Management — CrowdGuard AI' },
    { property: 'og:description', content: 'Configure webcam, video and CCTV sources for crowd monitoring.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CamerasPage,
});
