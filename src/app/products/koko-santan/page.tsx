"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type ProductLine = {
  name: string;
  summary: string;
  highlights: string[];
  image: string;
  badge: string;
};

type ColdChainStep = {
  title: string;
  copy: string;
};

export default function KokoPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    const elements = Array.from(document.querySelectorAll('[data-animate]')) as HTMLElement[];
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      });
      return;
    }

    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
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
      { threshold: 0.16 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const heroStats = [
    { label: 'Shelf life', value: '6 months frozen' },
    { label: 'Cold storage', value: '-18°C recommended' },
    { label: 'Origin', value: 'Sustainably sourced coconuts' },
  ];

  const featureHighlights: Feature[] = [
    {
      title: 'Flash-Frozen Freshness',
      description: 'Locked-in aroma, colour, and nutrients thanks to rapid freezing right after extraction.',
      icon: '/freshquok.svg',
    },
    {
      title: 'Consistent Every Batch',
      description: 'Precision fat-content balancing and HACCP-compliant processing for repeatable results.',
      icon: '/longlifequok.svg',
    },
    {
      title: 'Ready for Scale',
      description: 'Pack formats and logistics designed for restaurants, cloud kitchens, and manufacturers.',
      icon: '/plantquok.svg',
    },
  ];

  const productLines: ProductLine[] = [
    {
      name: 'Pure Coconut Cream',
      summary: 'Our flagship frozen coconut cream delivers buttery richness with zero additives.',
      highlights: [
        '100% single-origin coconuts, no dilution',
        'Fat content 23-26% for perfectly smooth curries and desserts',
        'Pack sizes: 500 g | 1 kg | food-service bulk',
      ],
      image: '/CoconutTree.png',
      badge: 'Signature',
    },
    {
      name: 'Frozen Grated Coconut',
      summary: 'Freshly shredded coconut strands that hold moisture and texture after thawing.',
      highlights: [
        'Ideal for cakes, kue tradisional, and confectionery fillings',
        'Quick-thaw format for minimal prep time',
        'Pack sizes: 500 g | 1 kg | custom bulk',
      ],
      image: '/cocofruit.png',
      badge: 'High Demand',
    },
    {
      name: 'Creamy Blends & R&D Lots',
      summary: 'Co-develop bespoke coconut bases for beverages, non-dairy creamers, and sauces.',
      highlights: [
        'Pilot-scale runs with rapid iteration',
        'Private label support with QA and documentation',
        'Compatible with Techondo traceability modules',
      ],
      image: '/quokka-landing.svg',
      badge: 'Co-create',
    },
  ];

  const coldChainSteps: ColdChainStep[] = [
    {
      title: 'Harvest & Rapid Transport',
      copy: 'Coconuts are selected at optimum maturity and brought to our facility within hours to preserve natural sugars.',
    },
    {
      title: 'Press, Test, and Freeze',
      copy: 'We cold-press, lab-test for fat and Brix, then flash-freeze to lock in flavour and aroma.',
    },
    {
      title: 'Packaged for Performance',
      copy: 'Products are portioned into service-ready packs with tamper-evident seals and traceable batch IDs.',
    },
    {
      title: 'Delivered Cold & On Time',
      copy: 'Frozen logistics partners maintain -18°C cold chain from our hub to your kitchen or warehouse.',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-100/60 text-slate-900">
      <NavigationBar />

      <main className="space-y-16 md:space-y-20 lg:space-y-24">
        <Section padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/80 shadow-[0_28px_80px_rgba(16,80,59,0.16)] backdrop-blur">
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-emerald-200/60 via-transparent to-teal-100/80" />
              <div className="absolute -top-24 -left-20 h-60 w-60 rounded-full bg-emerald-300/40 blur-3xl" />
              <div className="absolute -bottom-28 -right-12 h-64 w-64 rounded-full bg-teal-200/50 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
                <div className="space-y-8" data-animate>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-800/80">
                    KOKO Santan
                  </div>
                  <div className="space-y-5">
                    <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-[3.5rem]">
                      Pure coconut cream, frozen the moment it peaks
                    </h1>
                    <p className="text-lg text-slate-700 md:text-xl">
                      Premium Indonesian coconut cream and grated coconut, frozen fresh so your menus stay bright, aromatic, and consistently delicious.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button href="/contact" variant="primary" size="large">
                      Request product specs
                    </Button>
                    <Button href="/partner" variant="outline" size="large">
                      Partner with us
                    </Button>
                  </div>
                  <dl className="grid max-w-xl grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                        <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700/80">{stat.label}</dt>
                        <dd className="mt-2 text-base font-semibold text-slate-800">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="relative" data-animate>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-white/30 blur-xl" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 shadow-[0_22px_70px_rgba(15,80,59,0.22)]">
                      <Image src="/CoconutTree.png" alt="KOKO Santan coconut" width={720} height={520} className="h-full w-full object-cover" priority />
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
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700/90">Why kitchens choose us</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Fresh taste, operational confidence</h2>
              <p className="text-lg text-slate-600">
                From boutique patisseries to large-scale cloud kitchens, KOKO Santan keeps coconut flavour consistent while simplifying frozen storage and prep.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featureHighlights.map((feature) => (
                <div key={feature.title} data-animate>
                  <Card hover>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-emerald-100/70 p-3">
                          <Image src={feature.icon} alt={feature.title} fill className="object-contain" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section padding="large">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="max-w-3xl space-y-3" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700/90">Product lineup</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Precision-crafted coconut ingredients</h2>
              <p className="text-lg text-slate-600">
                Pick a ready-to-ship frozen format or co-create something unique with our food science partners.
              </p>
            </div>

            <div className="space-y-12">
              {productLines.map((product, index) => (
                <div key={product.name} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]" data-animate>
                  <div className={`order-2 flex flex-col gap-5 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                      {product.badge}
                    </span>
                    <h3 className="text-2xl font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-slate-600">{product.summary}</p>
                    <ul className="space-y-3 text-sm text-slate-600">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`order-1 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(15,80,59,0.14)]">
                      <Image src={product.image} alt={product.name} width={720} height={520} className="w-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div className="space-y-6" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700/90">Cold chain engineered</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Fresh taste from harvest to kitchen</h2>
              <p className="text-lg text-slate-600">
                Our integrated cold chain keeps coconut products stable without compromising natural sweetness or aroma — backed by Techondo telemetry.
              </p>
              <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-[0_18px_50px_rgba(16,80,59,0.12)]">
                <h3 className="text-lg font-semibold text-slate-900">Service guarantees</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    Real-time temperature monitoring and batch QR traceability
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    Flexible MOQ programmes for regional roll-outs
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    Dedicated culinary team for application testing and training
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative" data-animate>
              <div className="absolute inset-y-0 left-6 right-6 hidden rounded-full bg-linear-to-b from-emerald-200/60 via-emerald-100/0 to-transparent lg:block" />
              <div className="relative space-y-10">
                {coldChainSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-6 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(16,80,59,0.12)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
                      <p className="text-sm text-slate-600">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section padding="large">
          <div className="max-w-6xl mx-auto rounded-[2.75rem] border border-white/70 bg-slate-900 text-white shadow-[0_25px_70px_rgba(15,23,42,0.35)]">
            <div className="grid grid-cols-1 gap-10 px-10 py-12 md:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4" data-animate>
                <h3 className="text-2xl font-semibold">Let’s scale frozen coconut together</h3>
                <p className="text-slate-200">
                  We collaborate with brands, distributors, and culinary innovators who need premium coconut flavour without logistical headaches.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/partner" variant="secondary" size="large">
                    Discuss partnership
                  </Button>
                  <Button href="mailto:hello@comondo.id" variant="glass" size="large">
                    Email our team
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm text-slate-100 sm:grid-cols-2" data-animate>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">Clients served</p>
                  <p className="mt-2 text-2xl font-bold">180+</p>
                  <p className="mt-1 text-slate-200/80">Food businesses using KOKO Santan products regionally.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">Cold storage hubs</p>
                  <p className="mt-2 text-2xl font-bold">6</p>
                  <p className="mt-1 text-slate-200/80">Strategic logistics points for fast delivery in Indonesia.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">R&amp;D collaborations</p>
                  <p className="mt-2 text-2xl font-bold">25+</p>
                  <p className="mt-1 text-slate-200/80">Custom formulations developed with beverage and dessert brands.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">Traceability coverage</p>
                  <p className="mt-2 text-2xl font-bold">98%</p>
                  <p className="mt-1 text-slate-200/80">Batches integrated with Techondo quality modules.</p>
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
