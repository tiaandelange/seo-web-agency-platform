import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { services, getService } from '@/data/services';
import { CustomSystemsServiceView } from '@/components/services/custom-systems-service-view';
import { SeoWebsiteServiceView } from '@/components/services/seo-website-service-view';
import { EcommerceServiceView } from '@/components/services/ecommerce-service-view';
import { GenericServiceView } from '@/components/services/generic-service-view';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    seoTitle: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
    index: !service.noindex,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  switch (service.slug) {
    case 'custom-web-applications':
      return <CustomSystemsServiceView service={service} />;
    case 'seo-website-development':
      return <SeoWebsiteServiceView service={service} />;
    case 'ecommerce-websites':
      return <EcommerceServiceView service={service} />;
    default:
      return <GenericServiceView service={service} />;
  }
}
