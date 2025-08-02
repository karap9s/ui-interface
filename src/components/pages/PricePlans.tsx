'use client';

import { createSelectors } from "@/src/components/shared/configs/store";
import { usePricePlansStore } from "@/src/components/entities/price-plans";
import { Table } from "@/src/components/widgets/Table";

const PricePlansPage = () => {
  const pricePlansStore = createSelectors(usePricePlansStore);
  const items = pricePlansStore.use.items();

  return <div><Table items={items} /></div>;
};

export default PricePlansPage;
