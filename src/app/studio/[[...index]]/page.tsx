'use client';

import dynamic from 'next/dynamic';

const Studio = dynamic(() => import('./Studio'), {
  ssr: false,
  loading: () => <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Sanity Studio...</div>,
});

export default function StudioPage() {
  return <Studio />;
}

