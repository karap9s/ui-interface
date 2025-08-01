import PagesPage from '@/src/components/pages/Pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pages',
  description: 'Pages page',
};

export default function Pages() {
  return <PagesPage />;
}
