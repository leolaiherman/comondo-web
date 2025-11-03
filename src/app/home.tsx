"use client";

import NavigationBar from "@/components/desktop/navbar";
import { useTranslation } from '@/components/ui/LanguageProvider'
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/desktop/footer";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import IconCard from '@/components/ui/IconCard';
import SDGBadge from '@/components/ui/SDGBadge';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import coconutImg from "../../public/cocofruit.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Falling Coconut Animation Component
function FallingCoconutImg({ startX, containerHeight, depth, size, opacity, fallDuration, sway }: { startX: number, containerHeight: number, depth: number, size: number, opacity: number, fallDuration: number, sway: { amplitude: number; duration: number } }) {
  const coconutRef = useRef<HTMLImageElement>(null);
  const fallRef = useRef<gsap.core.Timeline | null>(null);
  const swayRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!coconutRef.current) return;

    const coconut = coconutRef.current;
    const startY = -Math.random() * 200 - 100;
    const startLeft = Math.min(95, Math.max(5, startX * 100)); // clamp to avoid edges
    const z = -200 * depth; // farther is more negative Z

    gsap.set(coconut, {
      left: `${startLeft}%`,
      y: startY,
      xPercent: -50,
      z,
      scale: size,
      willChange: 'transform'
    });

    // Vertical fall loop
    fallRef.current = gsap.timeline({ repeat: -1, paused: false });
    fallRef.current
      .to(coconut, {
        y: containerHeight + 100,
        duration: fallDuration,
        ease: "none",
      })
      .set(coconut, {
        y: -Math.random() * 200 - 100,
        left: `${Math.min(95, Math.max(5, Math.random() * 100))}%`
      });

    // Gentle horizontal sway for parallax feel
    swayRef.current = gsap.to(coconut, {
      x: `+=${(Math.random() < 0.5 ? -1 : 1) * sway.amplitude}`,
      duration: sway.duration,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      fallRef.current?.kill();
      swayRef.current?.kill();
    };
  }, [startX, containerHeight, depth, size, fallDuration, sway]);

  return (
    <img
      ref={coconutRef}
      src={coconutImg.src}
      alt=""
      className="absolute pointer-events-none select-none"
      style={{
        width: `${40 * size}px`,
        height: `${40 * size}px`,
        opacity,
        filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.18))",
        zIndex: Math.round(100 - depth * 100)
      }}
      draggable={false}
    />
  );
}

function CoconutRainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);
  const [coconuts, setCoconuts] = useState<{
    key: number;
    startX: number;
    depth: number;
    size: number;
    opacity: number;
    fallDuration: number;
    sway: { amplitude: number; duration: number };
  }[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 18;
    const items = Array.from({ length: count }, (_, i) => {
      const depth = Math.random(); // 0 (near) .. 1 (far)
      const size = 0.7 + (1 - depth) * 0.8; // near bigger
      const opacity = 0.6 + (1 - depth) * 0.4; // near more opaque
      const baseDuration = 10 + Math.random() * 6; // 10s - 16s
      const fallDuration = baseDuration * (0.9 + depth * 0.8); // farther slightly slower
      const sway = { amplitude: 20 + Math.random() * 30, duration: 2.5 + Math.random() * 2.5 };
      return {
        key: i,
        startX: Math.random(),
        depth,
        size,
        opacity,
        fallDuration,
        sway,
      };
    });
    setCoconuts(items);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0, perspective: '800px', transformStyle: 'preserve-3d' as any }}
    >
      {coconuts.map(({ key, startX, depth, size, opacity, fallDuration, sway }) => (
        <FallingCoconutImg
          key={key}
          startX={startX}
          depth={depth}
          size={size}
          opacity={opacity}
          fallDuration={fallDuration}
          sway={sway}
          containerHeight={containerHeight}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  useEffect(() => {
    // Hero text animation
    gsap.fromTo(
      '.hero-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );

    // Coconut rain fade in
    gsap.fromTo(
      '.coconut-rain',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Section scroll animations using ID selectors
    const sections = ['#about', '#mission', '#impact', '#advantage', '#products', '#contact'];
    sections.forEach((selector) => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

  <main className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20">
        {/* Hero Section */}
        <Section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          padding="large"
        >
        <div className="coconut-rain">
          <CoconutRainCanvas />
        </div>
  <div className="hero-content relative z-10 w-full mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-primary">
            {t('home.hero.title_prefix')}
            <br />
            <span className="text-secondary">{t('home.hero.title_highlight')}</span>
          </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-700 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Button variant="primary" size="large">{t('home.hero.get_started')}</Button>
                <Button variant="glass" size="large">{t('home.hero.our_products')}</Button>
          </div>
        </div>
        </Section>

        {/* What We Do Section */}
        <Section
          id="about"
          padding="large"
          background="cream"
          contentClassName="py-[3rem]"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">
                {t('home.about.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                {t('home.about.description')}
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <IconCard
              icon="🥥"
              title={t('home.what.fullUtilization_title')}
              description={t('home.what.fullUtilization_desc')}
            />
            <IconCard
              icon="🌱"
              title={t('home.what.greenEconomy_title')}
              description={t('home.what.greenEconomy_desc')}
            />
            <IconCard
              icon="🚀"
              title={t('home.what.innovation_title')}
              description={t('home.what.innovation_desc')}
            />
          </div>
        </Section>

        {/* Mission & Vision Section */}
        <Section
          id="mission"
          padding="large"
          background="gradient"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Mission */}
            <Card variant="glass" className="p-8 md:p-10" hover>
              <div className="text-4xl md:text-5xl mb-4">🎯</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">{t('home.mission.mission_title')}</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                {t('home.mission.mission_text')}
              </p>
            </Card>

            {/* Vision */}
            <Card variant="glass" className="p-8 md:p-10" hover>
              <div className="text-4xl md:text-5xl mb-4">🌍</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">{t('home.mission.vision_title')}</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                {t('home.mission.vision_text')}
              </p>
            </Card>
          </div>

          {/* What is COMONDO */}
          <Card variant="glass" className="mt-12 md:mt-16 p-8 md:p-12" hover>
            <div className="text-center mb-8">
              <Image
                src="/comondo_logo.png"
                width={200}
                height={60}
                alt="COMONDO Logo"
                className="mx-auto mb-6"
              />
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                {t('home.mission.what_is_comondo')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-5xl mb-3">🥥</div>
                <p className="text-lg md:text-xl font-semibold text-primary mb-2">Co = Coconut</p>
                <p className="text-gray-600">(Italian)</p>
              </div>
              <div>
                <div className="text-5xl mb-3">🌍</div>
                <p className="text-lg md:text-xl font-semibold text-primary mb-2">Mondo = World</p>
                <p className="text-gray-600">(Italian)</p>
              </div>
              <div>
                <div className="text-5xl mb-3">✨</div>
                <p className="text-lg md:text-xl font-semibold text-secondary mb-2">COMONDO</p>
                <p className="text-gray-700 font-medium">{t('home.mission.the_coconut_world')}</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* Impact & Sustainability Section */}
        <Section
          id="impact"
          padding="large"
          background="cream"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">
              {t('home.impact.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t('home.impact.description')}
            </p>
          </div>

          {/* SDG Badges */}
          <div className="flex flex-wrap justify-center gap-5 md:gap-8 mb-12 md:mb-16">
            <SDGBadge goal={2} title={t('home.impact.sdg.2')} />
            <SDGBadge goal={8} title={t('home.impact.sdg.8')} />
            <SDGBadge goal={12} title={t('home.impact.sdg.12')} />
            <SDGBadge goal={13} title={t('home.impact.sdg.13')} />
            <SDGBadge goal={15} title={t('home.impact.sdg.15')} />
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCard
              value="$12.5B"
              label={t('home.stats.global_market')}
              trend="up"
            />
            <StatCard
              value="18M+"
              label={t('home.stats.tons_produced')}
              trend="up"
            />
            <StatCard
              value="#1"
              label={t('home.stats.indonesia_rank')}
            />
            <StatCard
              value="6.2%"
              label={t('home.stats.growth_rate')}
              trend="up"
            />
          </div>

          {/* ESG Highlights */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-3xl md:text-4xl mb-3">🌱</div>
              <h4 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.esg.environmental.title')}</h4>
              <p className="text-sm md:text-base text-gray-600">{t('home.esg.environmental.desc')}</p>
            </Card>
            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-3xl md:text-4xl mb-3">👥</div>
              <h4 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.esg.social.title')}</h4>
              <p className="text-sm md:text-base text-gray-600">{t('home.esg.social.desc')}</p>
            </Card>
            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-3xl md:text-4xl mb-3">📊</div>
              <h4 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.esg.governance.title')}</h4>
              <p className="text-sm md:text-base text-gray-600">{t('home.esg.governance.desc')}</p>
            </Card>
          </div>
        </Section>

        {/* COMONDO Advantage Section */}
        <Section
          id="advantage"
          padding="large"
          background="white"
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">
              {t('home.advantage.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t('home.advantage.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="flex items-start gap-4">
                <div className="text-3xl md:text-4xl shrink-0">🇮🇩</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">{t('home.advantage_cards.strategic_location.title')}</h3>
                  <p className="text-sm md:text-base text-gray-700">{t('home.advantage_cards.strategic_location.desc')}</p>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="flex items-start gap-4">
                <div className="text-3xl md:text-4xl shrink-0">🔄</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">{t('home.advantage_cards.full_value_chain.title')}</h3>
                  <p className="text-sm md:text-base text-gray-700">{t('home.advantage_cards.full_value_chain.desc')}</p>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="flex items-start gap-4">
                <div className="text-3xl md:text-4xl shrink-0">💰</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">{t('home.advantage_cards.multiple_revenue_streams.title')}</h3>
                  <p className="text-sm md:text-base text-gray-700">{t('home.advantage_cards.multiple_revenue_streams.desc')}</p>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="flex items-start gap-4">
                <div className="text-3xl md:text-4xl shrink-0">📈</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">{t('home.advantage_cards.scalable_model.title')}</h3>
                  <p className="text-sm md:text-base text-gray-700">{t('home.advantage_cards.scalable_model.desc')}</p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* KOKO Santan - First Product Section */}
        <Section
          id="products"
          padding="large"
          background="cream"
          className="relative"
        >
          {/* Top-down subtle shade to ease the transition from the section above */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0), var(--color-coconut-white) 60%)'
            }}
          />

          {/* Vertical intersection gradient (desktop-only) between image and feature column */}
          <div
            className="hidden lg:block absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0), var(--color-coconut-white) 30%, var(--color-coconut-white) 70%, rgba(255,255,255,0))'
            }}
          />

          <div className="relative z-10">
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-block bg-secondary text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold mb-4">
                {t('home.products.badge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">
                KOKO Santan
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                {t('home.products.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Product Image */}
              <Image
                src="/quokka-landing.svg"
                width={400}
                height={400}
                alt="KOKO Santan Product"
                className="w-full max-w-md h-auto rounded-2xl mx-auto"
              />

              {/* Product Features */}
              <div className="space-y-8">


                <div className="flex items-start gap-6">
                  <div className="bg-primary text-white rounded-lg p-3 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 text-primary">{t('home.products.feature_plantbased')}</h3>
                    <p className="text-sm md:text-base text-gray-600">{t('home.products.feature_plantbased_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-primary text-white rounded-lg p-3 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 text-primary">{t('home.products.feature_cholesterol')}</h3>
                    <p className="text-sm md:text-base text-gray-600">{t('home.products.feature_cholesterol_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-primary text-white rounded-lg p-3 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 text-primary">{t('home.products.feature_farmers')}</h3>
                    <p className="text-sm md:text-base text-gray-600">{t('home.products.feature_farmers_desc')}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="primary" size="large" className="w-full sm:w-auto">
                    {t('home.products.learn_more')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Get Involved Section */}
        <Section
          id="contact"
          background="white"
          contentClassName="py-[3rem]"
        >
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary">
          {t('home.contact.title')}
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto">
          {t('home.contact.subtitle')}
        </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-4xl md:text-5xl mb-3">💼</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.contact.investors')}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {t('home.contact.investors_desc')}
              </p>
              <Button variant="secondary" size="medium" className="w-full">
                {t('home.contact.investment_info')}
              </Button>
            </Card>

            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-4xl md:text-5xl mb-3">🤝</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.contact.partners')}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {t('home.contact.partners_desc')}
              </p>
              <Button variant="secondary" size="medium" className="w-full">
                {t('home.contact.partner_with_us')}
              </Button>
            </Card>

            <Card variant="glass" className="p-6 md:p-8" hover>
              <div className="text-4xl md:text-5xl mb-3">🥥</div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-primary">{t('home.contact.customers')}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {t('home.contact.customers_desc')}
              </p>
              <Button variant="secondary" size="medium" className="w-full">
                {t('home.contact.shop_now')}
              </Button>
            </Card>
          </div>

  <div className="text-center rounded-2xl p-10 md:p-16 text-white" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('home.contact.ready_title')}</h3>
          <p className="text-base md:text-lg mb-6 md:mb-8 opacity-95">
            {t('home.contact.ready_text')}
          </p>
          <Button
            variant="primary"
            size="large"
            className="bg-transparent text-white hover:bg-white/10 border border-white/20"
          >
            {t('home.contact.contact_us')}
          </Button>
        </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
