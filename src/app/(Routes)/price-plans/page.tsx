import PricePlansPage from '@/src/components/pages/PricePlans';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Price Plans',
  description: 'Price Plans page',
};

export default function PricePlans() {
  return <PricePlansPage />;
}
