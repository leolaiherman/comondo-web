"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import { useTranslation } from '@/components/ui/LanguageProvider';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <main className="space-y-12 md:space-y-16 lg:space-y-20">
        <Section padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('about.title')}</h1>
            <p className="text-lg text-gray-700 mb-6">{t('about.subtitle')}</p>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8" variant="glass">
              <h2 className="text-2xl font-bold mb-3">{t('about.who.title')}</h2>
              <p className="text-gray-700">{t('about.who.body')}</p>
            </Card>

            <Card className="p-8" variant="glass">
              <h2 className="text-2xl font-bold mb-3">{t('about.story.title')}</h2>
              <p className="text-gray-700">{t('about.story.body')}</p>
            </Card>

            <Card className="p-8" variant="glass">
              <h2 className="text-2xl font-bold mb-3">{t('about.values.title')}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>{t('about.values.integrity')}</li>
                <li>{t('about.values.innovation')}</li>
                <li>{t('about.values.sustainability')}</li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section padding="large">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t('about.cta_title')}</h3>
            <p className="text-gray-700 mb-6">{t('about.cta_body')}</p>
            <div className="flex justify-center">
              <Button variant="primary" size="large">{t('about.cta_button')}</Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
