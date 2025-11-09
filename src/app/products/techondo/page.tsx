"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const FLIP_DURATION = 700;

type RoadmapItem = {
  index: number;
  title: string;
  subtitle: string;
  detail?: string;
};

export default function TechondoPage() {
  const roadmap: RoadmapItem[] = [
    {
      index: 1,
      title: 'Phase 1 — Smart Foundations',
      subtitle: 'Build and test internal system for KOKO Santan operations',
      detail: 'Digitise production data, automate freshness control, and streamline distribution from factory to outlet.',
    },
    {
      index: 2,
      title: 'Phase 2 — Trusted Traceability',
      subtitle: 'Launch supply-chain traceability pilot with partner factories',
      detail: 'Connect farmers, factories, and logistics partners with end-to-end QR traceability and compliance reporting.',
    },
    {
      index: 3,
      title: 'Phase 3 — Connected Marketplace',
      subtitle: 'Enable marketplace and digital order management across the Comondo network',
      detail: 'Roll out procurement, pricing intelligence, and agent tooling so every stakeholder can transact in real time.',
    },
  ];

  const features = [
    {
      title: 'Smart Operations',
      copy: 'Real-time inventory, production quality checks, and freshness monitoring across every facility.',
      icon: '/file.svg',
    },
    {
      title: 'Traceability System',
      copy: 'Visibility from coconut farm to finished product with compliance-ready audit trails.',
      icon: '/globe.svg',
    },
    {
      title: 'Digital Ordering & Agent Tools',
      copy: 'A unified ordering network for buyers, distributors, and agents—starting with KOKO Santan pilots.',
      icon: '/next.svg',
    },
  ];

  const [activeMarker, setActiveMarker] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const markersRef = useRef<Array<HTMLDivElement | null>>([]);
  const flipTimeoutRef = useRef<number | null>(null);
  const halfFlipTimeoutRef = useRef<number | null>(null);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-animate]')) as HTMLElement[];

    if (!els.length) return;

    if (prefersReducedMotion) {
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      });
      return;
    }

    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'all 520ms cubic-bezier(0.22, 0.85, 0.35, 1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const markers = markersRef.current.filter(Boolean) as HTMLDivElement[];
    if (!markers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const idx = Number((visible[0].target as HTMLElement).dataset.idx) || 0;
        if (idx === prevIndexRef.current) return;

        prevIndexRef.current = idx;
        setActiveMarker(idx);
        setNextIndex(idx);

        if (prefersReducedMotion) {
          setCardIndex(idx);
          setIsFlipping(false);
          return;
        }

        setIsFlipping(true);

        if (halfFlipTimeoutRef.current !== null) {
          window.clearTimeout(halfFlipTimeoutRef.current);
        }
        halfFlipTimeoutRef.current = window.setTimeout(() => {
          setCardIndex(idx);
        }, FLIP_DURATION / 2);

        if (flipTimeoutRef.current !== null) {
          window.clearTimeout(flipTimeoutRef.current);
        }
        flipTimeoutRef.current = window.setTimeout(() => {
          setIsFlipping(false);
        }, FLIP_DURATION);
      },
      { threshold: 0.65 }
    );

    markers.forEach((marker) => observer.observe(marker));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => () => {
    if (flipTimeoutRef.current !== null) window.clearTimeout(flipTimeoutRef.current);
    if (halfFlipTimeoutRef.current !== null) window.clearTimeout(halfFlipTimeoutRef.current);
  }, []);

  const currentCard = roadmap[cardIndex] ?? roadmap[0];
  const pendingCard = roadmap[nextIndex] ?? currentCard;

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50/60 text-slate-900">
      <NavigationBar />
      <main className="space-y-16 md:space-y-20 lg:space-y-24">
        <Section padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-sky-100 via-transparent to-emerald-100 opacity-80" />
              <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
              <div className="absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 gap-10 p-10 md:grid-cols-[1.25fr_1fr] md:p-14">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-800/80">
                    Techondo Platform
                  </div>
                  <div className="space-y-5">
                    <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-[3.4rem]">
                      Powering a transparent, data-driven coconut ecosystem
                    </h1>
                    <p className="text-lg text-slate-700 md:text-xl">
                      We blend operational know-how with resilient software so partners can trace, measure, and scale every coconut product—from farm to marketplace.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button href="/partner" variant="primary" size="large">Explore Collaboration</Button>
                    <Button href="/contact" variant="outline" size="large">Request Demo</Button>
                  </div>
                  <dl className="grid max-w-xl grid-cols-1 gap-6 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                      <dt className="font-semibold text-slate-800">Live production telemetry</dt>
                      <dd className="mt-1 text-slate-600">Quality KPIs, freshness timers, and agent orders updated in real-time.</dd>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                      <dt className="font-semibold text-slate-800">Trusted partner experiences</dt>
                      <dd className="mt-1 text-slate-600">APIs and dashboards designed for factories, retailers, and investors.</dd>
                    </div>
                  </dl>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-white/30 to-white/10 blur-xl" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-4xl border border-white/70 bg-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                      <Image src="/globe.svg" alt="Digital operations dashboard" width={760} height={520} className="h-full w-full object-cover" priority />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="max-w-3xl space-y-4" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">Why Techondo</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Intelligence for every node of the coconut supply chain</h2>
              <p className="text-lg text-slate-600">
                We partner with factories, distribution teams, and field agents to build software that reflects real operational constraints. The result: faster cycles, less waste, and trusted data for decision-making.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} data-animate className="h-full">
                  <Card hover>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-sky-100/70 p-3">
                          <Image src={feature.icon} alt={feature.title} fill className="object-contain" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600">{feature.copy}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="space-y-6" data-animate>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-slate-900">Roadmap</h3>
                <span className="hidden text-sm font-semibold uppercase tracking-[0.3em] text-sky-800 lg:block">Scroll to explore phases</span>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative">
                  <div className="sticky top-[20vh]">
                    <div className="relative" style={{ perspective: prefersReducedMotion ? undefined : '1200px' }}>
                      <div className="rounded-3xl border border-sky-100/70 bg-white/80 p-px shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur">
                        <div className="relative rounded-[calc(1.8rem-1px)] bg-white">
                          <div
                            className="relative h-full min-h-64 px-8 py-10"
                            style={{
                              transform: prefersReducedMotion ? 'none' : `rotateX(${isFlipping ? 180 : 0}deg)`,
                              transition: prefersReducedMotion ? undefined : `transform ${FLIP_DURATION}ms cubic-bezier(0.18, 0.72, 0.24, 1)`,
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            <div
                              className="absolute inset-0 flex h-full flex-col justify-center gap-4 rounded-[calc(1.8rem-1px)] bg-white/95 px-1"
                              style={{ backfaceVisibility: 'hidden', transform: 'rotateX(0deg)' }}
                            >
                              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700">{currentCard.index}</span>
                                Current Phase
                              </div>
                              <h4 className="text-2xl font-bold text-slate-900">{currentCard.title}</h4>
                              <p className="text-slate-600">{currentCard.subtitle}</p>
                              {currentCard.detail && <p className="text-sm text-slate-500">{currentCard.detail}</p>}
                            </div>
                            <div
                              className="absolute inset-0 flex h-full flex-col justify-center gap-4 rounded-[calc(1.8rem-1px)] bg-white/95 px-1"
                              style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                            >
                              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700">{pendingCard.index}</span>
                                Upcoming Phase
                              </div>
                              <h4 className="text-2xl font-bold text-slate-900">{pendingCard.title}</h4>
                              <p className="text-slate-600">{pendingCard.subtitle}</p>
                              {pendingCard.detail && <p className="text-sm text-slate-500">{pendingCard.detail}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sr-only" aria-live="polite">
                      {`Phase ${currentCard.index}: ${currentCard.title}`}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-10 right-10 top-0 hidden h-full bg-linear-to-b from-sky-100/70 via-sky-200/40 to-transparent lg:block" />
                  <div className="relative space-y-28">
                    {roadmap.map((phase, idx) => (
                      <div
                        key={phase.title}
                        data-idx={idx}
                        ref={(el) => {
                          markersRef.current[idx] = el;
                        }}
                        className="relative flex min-h-[55vh] items-center"
                      >
                        <div className={`relative z-10 flex w-full flex-col gap-3 rounded-3xl border p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-all duration-300 ${activeMarker === idx ? 'border-sky-400/80 bg-white text-slate-900' : 'border-white/70 bg-white/80 text-slate-600'} lg:ml-12`}
                        >
                          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${activeMarker === idx ? 'border-sky-400 bg-sky-500 text-white' : 'border-sky-200 bg-white text-sky-600'}`}>{phase.index}</span>
                            Roadmap Milestone
                          </div>
                          <h5 className="text-xl font-semibold text-slate-900">{phase.title}</h5>
                          <p className="text-slate-600">{phase.subtitle}</p>
                          {phase.detail && <p className="text-sm text-slate-500">{phase.detail}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/70 bg-slate-900 text-white shadow-[0_25px_70px_rgba(15,23,42,0.35)]">
              <div className="grid grid-cols-1 gap-8 px-10 py-12 md:grid-cols-[1.2fr_1fr]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Let’s co-build the future of coconut infrastructure</h3>
                  <p className="text-slate-200">
                    We collaborate with strategic partners, investors, and technology teams who share the belief that transparent data unlocks sustainable growth for coconut communities.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button href="/partner" variant="secondary" size="large">Partner with Techondo</Button>
                    <Button href="mailto:hello@comondo.id" variant="glass" size="large">Email the team</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-100 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Pilot Factories</p>
                    <p className="mt-2 text-2xl font-bold">4+</p>
                    <p className="mt-1 text-slate-200/80">Running telemetry and digital ordering through Techondo modules.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Agent Network</p>
                    <p className="mt-2 text-2xl font-bold">120+</p>
                    <p className="mt-1 text-slate-200/80">Field agents connected to traceability pilots and volume tracking.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Processing Throughput</p>
                    <p className="mt-2 text-2xl font-bold">75K L / month</p>
                    <p className="mt-1 text-slate-200/80">Production monitored through freshness sensors and yield analytics.</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Data Confidence</p>
                    <p className="mt-2 text-2xl font-bold">98%</p>
                    <p className="mt-1 text-slate-200/80">Accuracy on pilot traceability batches (farm → distribution).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
