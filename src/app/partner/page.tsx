"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import { useTranslation } from '@/components/ui/LanguageProvider';

export default function PartnerPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <main className="space-y-12 md:space-y-16 lg:space-y-20">
        <Section padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('partner.title')}</h1>
            <p className="text-lg text-gray-700 mb-6">{t('partner.subtitle')}</p>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6" hover>
              <h3 className="text-xl font-bold mb-2">For Investors</h3>
              <p className="text-gray-700 mb-4">{t('partner.investors_body')}</p>
              <Button variant="secondary">{t('partner.get_in_touch')}</Button>
            </Card>

            <Card className="p-6" hover>
              <h3 className="text-xl font-bold mb-2">For Businesses</h3>
              <p className="text-gray-700 mb-4">{t('partner.businesses_body')}</p>
              <Button variant="secondary">{t('partner.get_in_touch')}</Button>
            </Card>

            <Card className="p-6" hover>
              <h3 className="text-xl font-bold mb-2">For Communities</h3>
              <p className="text-gray-700 mb-4">{t('partner.communities_body')}</p>
              <Button variant="secondary">{t('partner.get_in_touch')}</Button>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
