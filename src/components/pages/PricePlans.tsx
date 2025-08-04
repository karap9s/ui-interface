'use client';

import { createSelectors } from '@/src/components/shared/configs/store';
import { usePricePlansStore } from '@/src/components/entities/price-plans';
import { Table } from '@/src/components/widgets/Table';
import AnimatedContainer from '@/src/components/shared/ui/AnimatedContainer';

const PricePlansPage = () => {
  const pricePlansStore = createSelectors(usePricePlansStore);
  const items = pricePlansStore.use.items();
  const updateItem = pricePlansStore.use.updateItem();

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Price Plans
          </h1>
        </div>
        <Table items={items} updateItem={updateItem} />
      </div>
    </AnimatedContainer>
  );
};

export default PricePlansPage;
