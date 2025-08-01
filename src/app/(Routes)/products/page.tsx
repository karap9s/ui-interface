import ProductsPage from '@/src/components/pages/Products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page',
};

export default function Products() {
  return <ProductsPage />;
}
