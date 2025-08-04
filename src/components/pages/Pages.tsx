'use client';

import { usePagesStore } from '@/src/components/entities/pages';
import { createSelectors } from '@/src/components/shared/configs/store';
import { Table } from '@/src/components/widgets/Table';

const PagesPage = () => {
  const pagesStore = createSelectors(usePagesStore);
  const items = pagesStore.use.items();

  return <Table items={items} />;
};

export default PagesPage;
