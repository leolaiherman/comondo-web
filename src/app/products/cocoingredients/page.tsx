"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Capability = {
  title: string;
  description: string;
  icon: string;
};

type PortfolioItem = {
  name: string;
  details: string;
  specs: string;
  image: string;
};

type ExportService = {
  title: string;
  points: string[];
};

export default function CocoIngredientsPage() {
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
    { label: 'Export markets', value: '18 countries' },
    { label: 'Certifications', value: 'ISO | HACCP | Halal' },
    { label: 'Monthly capacity', value: '1.2K MT+' },
  ];

  const capabilities: Capability[] = [
    {
      title: 'Dedicated Factory Network',
      description: 'Partner facilities audited quarterly to meet food safety and sustainability benchmarks.',
      icon: '/globe.svg',
    },
    {
      title: 'Documentation Ready',
      description: 'Full export dossiers, traceability packs, and compliance support per destination.',
      icon: '/file.svg',
    },
    {
      title: 'Supply Stability',
      description: 'Inventory planning, buffer stock, and smart forecasting powered by Techondo data.',
      icon: '/next.svg',
    },
  ];

  const portfolio: PortfolioItem[] = [
    {
      name: 'Desiccated Coconut (Low/High Fat)',
      details: 'Finely shredded coconut meat for bakery, confectionery, and savoury applications.',
      specs: 'Moisture <3% · Fat 52-68% · 25 kg multiwall bag · Shelf life 12 months',
      image: '/quokka-landing.svg',
    },
    {
      name: 'Virgin Coconut Oil (VCO)',
      details: 'Cold-pressed from fresh meat with mild aroma, suitable for food and cosmetic lines.',
      specs: 'FFA <0.2% · Peroxide <5 meq/kg · 190 kg drums | bottled SKUs',
      image: '/comondo_1tc.png',
    },
    {
      name: 'Coconut Flour',
      details: 'High-fibre, gluten-free flour made from defatted coconut residue for healthy formulations.',
      specs: 'Fibre 35-40% · Protein 18% · 20 kg kraft bag',
      image: '/CoconutTree.png',
    },
    {
      name: 'Coconut Chips',
      details: 'Crisp toasted flakes ready for snacking mixes, cereal toppings, and dessert finishes.',
      specs: 'Unsweetened / sweetened · 5 kg bulk | 250 g retail pouch · Shelf life 12 months',
      image: '/longlifequok.svg',
    },
    {
      name: 'Coconut Whipping Cream',
      details: 'Dairy-free whipping base with a rich body for beverages and pastry preparations.',
      specs: 'Fat 25-30% · 1 L | 20 L aseptic packs · Frozen or ambient variants',
      image: '/freshquok.svg',
    },
    {
      name: 'Raw Coconut (Whole / Grated)',
      details: 'Sustainably sourced coconuts for juice, desiccation, or further processing lines.',
      specs: 'Custom grades · Container loads or bulk totes · Quality inspections pre-loading',
      image: '/plantquok.svg',
    },
  ];

  const exportServices: ExportService[] = [
    {
      title: 'Quality & Compliance Suite',
      points: [
        'Full COA, MSDS, Halal, and origin documents provided per shipment',
        'Inline sampling with third-party lab verification on request',
        'Real-time production telemetry via Techondo integration',
      ],
    },
    {
      title: 'Global Logistics Coordination',
      points: [
        'FOB, CIF, and DDP incoterm options with reliable freight partners',
        'Temperature-controlled containers for sensitive derivatives',
        'Proactive tracking and exception handling through central OPS',
      ],
    },
    {
      title: 'Co-Development Support',
      points: [
        'Pilot batch runs and R&D lots for new product development',
        'Custom packaging formats and private label programmes',
        'Regulatory advisory for market entry across ASEAN, EU, US',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50/60 text-slate-900">
      <NavigationBar />

      <main className="space-y-16 md:space-y-20 lg:space-y-24">
        <Section padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/80 shadow-[0_30px_90px_rgba(30,64,175,0.15)] backdrop-blur">
              <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-200/80 via-transparent to-sky-100/80" />
              <div className="absolute -top-28 -left-12 h-60 w-60 rounded-full bg-sky-300/30 blur-3xl" />
              <div className="absolute -bottom-32 -right-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-10 md:grid-cols-[1.2fr_1fr] md:p-14">
                <div className="space-y-8" data-animate>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-800/80">
                    CocoIngredients
                  </div>
                  <div className="space-y-5">
                    <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-[3.5rem]">
                      Export-grade coconut ingredients, handled end-to-end
                    </h1>
                    <p className="text-lg text-slate-700 md:text-xl">
                      We orchestrate sourcing, processing, documentation, and logistics so your buyers receive consistent coconut derivatives at scale.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button href="/contact" variant="primary" size="large">
                      Download product catalog
                    </Button>
                    <Button href="/contact" variant="outline" size="large">
                      Schedule a procurement call
                    </Button>
                  </div>
                  <dl className="grid max-w-xl grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                        <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">{stat.label}</dt>
                        <dd className="mt-2 text-base font-semibold text-slate-800">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="relative" data-animate>
                  <div className="absolute inset-0 rounded-[2.5rem] bg-white/30 blur-xl" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 shadow-[0_24px_80px_rgba(30,64,175,0.18)]">
                      <Image src="/cocofruit.png" alt="CocoIngredients" width={720} height={520} className="h-full w-full object-cover" priority />
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
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700/90">What sets us apart</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Industrial rigour, agile partnership</h2>
              <p className="text-lg text-slate-600">
                CocoIngredients combines a trusted production network with digital transparency, helping you deliver on demanding buyer specs anywhere in the world.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {capabilities.map((capability) => (
                <div key={capability.title} data-animate>
                  <Card hover>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-sky-100/70 p-3">
                          <Image src={capability.icon} alt={capability.title} fill className="object-contain" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{capability.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600">{capability.description}</p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700/90">Portfolio</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Ready-to-ship coconut derivatives</h2>
              <p className="text-lg text-slate-600">
                Select from our certified range or brief the team for customised formulations and packaging formats.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {portfolio.map((item) => (
                <Card key={item.name} hover>
                  <div className="flex flex-col gap-6" data-animate>
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100/80">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-600">{item.details}</p>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-600">
                      {item.specs}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div className="space-y-6" data-animate>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700/90">Export operations</p>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Services that derisk international supply</h2>
              <p className="text-lg text-slate-600">
                Our operations team coordinates documentation, inspections, and freight so your buyers receive compliant shipments without surprises.
              </p>
              <div className="rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-[0_18px_50px_rgba(30,64,175,0.1)]">
                <h3 className="text-lg font-semibold text-slate-900">Assurance programme</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                    Batch-level QC dashboards shared pre-loading
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                    On-ground inspectors coordinated across Java & Sulawesi
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                    Data room access for your compliance and sales teams
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative" data-animate>
              <div className="absolute inset-y-0 left-6 right-6 hidden rounded-full bg-linear-to-b from-sky-200/60 via-sky-100/0 to-transparent lg:block" />
              <div className="relative space-y-10">
                {exportServices.map((service, index) => (
                  <div key={service.title} className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(30,64,175,0.12)]">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {service.title}
                    </div>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section padding="large">
          <div className="max-w-6xl mx-auto rounded-[2.75rem] border border-white/70 bg-slate-900 text-white shadow-[0_28px_80px_rgba(15,23,42,0.32)]">
            <div className="grid grid-cols-1 gap-10 px-10 py-12 md:grid-cols-[1.05fr_1fr]">
              <div className="space-y-4" data-animate>
                <h3 className="text-2xl font-semibold">Ready to brief a coconut supply project?</h3>
                <p className="text-slate-200">
                  Share your specifications and our team will assemble the right factories, documentation, and logistics partners for a smooth first shipment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="secondary" size="large">
                    Start the procurement process
                  </Button>
                  <Button href="mailto:export@comondo.id" variant="glass" size="large">
                    Email export team
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm text-slate-100 sm:grid-cols-2" data-animate>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Container shipments</p>
                  <p className="mt-2 text-2xl font-bold">320+</p>
                  <p className="mt-1 text-slate-200/80">Exported annually across food, beverage, and cosmetics sectors.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Factory partners</p>
                  <p className="mt-2 text-2xl font-bold">12</p>
                  <p className="mt-1 text-slate-200/80">Audited plants across Java, Sulawesi, and North Sumatra.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">QA conformity</p>
                  <p className="mt-2 text-2xl font-bold">99.2%</p>
                  <p className="mt-1 text-slate-200/80">Acceptance rate across repeat orders in 2024.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">Lead time</p>
                  <p className="mt-2 text-2xl font-bold">21 days</p>
                  <p className="mt-1 text-slate-200/80">Average from PO to vessel departure for repeat programmes.</p>
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
