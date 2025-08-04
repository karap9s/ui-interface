'use client';

import { createSelectors } from '@/src/components/shared/configs/store';
import { usePricePlansStore } from '@/src/components/entities/price-plans';
import { Table } from '@/src/components/widgets/Table';

const PricePlansPage = () => {
  const pricePlansStore = createSelectors(usePricePlansStore);
  const items = pricePlansStore.use.items();
  const updateItem = pricePlansStore.use.updateItem();

  return <Table items={items} updateItem={updateItem} />;
};

export default PricePlansPage;
