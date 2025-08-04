'use client';

import { usePagesStore } from '@/src/components/entities/pages';
import { createSelectors } from '@/src/components/shared/configs/store';
import { Table } from '@/src/components/widgets/Table';

const PagesPage = () => {
  const pagesStore = createSelectors(usePagesStore);
  const items = pagesStore.use.items();
  const updateItem = pagesStore.use.updateItem();

  return <Table items={items} updateItem={updateItem} />;
};

export default PagesPage;
