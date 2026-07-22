'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const IndustrialEnginePreview = dynamic(
  () =>
    import('./industrial-engine/industrial-engine-preview').then(
      (module) => module.IndustrialEnginePreview,
    ),
  { ssr: false },
);

function EngineSkeleton() {
  return (
    <section
      className="band-ink min-h-[52rem] border-y border-white/10 bg-[#0b1f28]"
      aria-hidden
    >
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="h-8 w-64 rounded bg-white/10" />
        <div className="mt-4 h-4 max-w-md rounded bg-white/5" />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="h-80 rounded bg-white/5 lg:col-span-7" />
          <div className="h-80 rounded bg-white/5 lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}

export function IndustrialEngineLazy() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="min-h-[52rem]">
      {shouldLoad ? <IndustrialEnginePreview /> : <EngineSkeleton />}
    </div>
  );
}
