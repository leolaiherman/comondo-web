"use client";

import NavigationBar from '@/components/Navbar';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Footer from '@/components/desktop/footer';
import Link from 'next/link';
import { useTranslation } from '@/components/ui/LanguageProvider';

export default function ProductsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <main className="space-y-12 md:space-y-16 lg:space-y-20">
        <Section padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('products.title')}</h1>
            <p className="text-lg text-gray-700 mb-6">{t('products.subtitle')}</p>
          </div>
        </Section>

        <Section padding="large" background="cream">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center" hover>
              <h3 className="text-xl font-bold mb-3">KOKO Santan</h3>
              <p className="text-gray-700 mb-4">Fresh pasteurized coconut cream for households, restaurants, and food manufacturers.</p>
              <Link href="/products/koko-santan"><Button variant="primary">{t('products.koko.cta')}</Button></Link>
            </Card>

            <Card className="p-6 text-center" hover>
              <h3 className="text-xl font-bold mb-3">CocoIngredients</h3>
              <p className="text-gray-700 mb-4">Industrial coconut ingredients — desiccated coconut, VCO, flour, chips and more.</p>
              <Link href="/products/cocoingredients"><Button variant="primary">{t('products.coco.cta')}</Button></Link>
            </Card>

            <Card className="p-6 text-center" hover>
              <h3 className="text-xl font-bold mb-3">Techondo</h3>
              <p className="text-gray-700 mb-4">Traceability, ordering, and production optimization to make operations smarter and connected.</p>
              <Link href="/products/techondo"><Button variant="primary">{t('products.techondo.cta')}</Button></Link>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
