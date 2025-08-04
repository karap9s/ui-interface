'use client';

import { usePagesStore } from '@/src/components/entities/pages';
import { createSelectors } from '@/src/components/shared/configs/store';
import { Table } from '@/src/components/widgets/Table';
import AnimatedContainer from '@/src/components/shared/ui/AnimatedContainer';

const PagesPage = () => {
  const pagesStore = createSelectors(usePagesStore);
  const items = pagesStore.use.items();
  const updateItem = pagesStore.use.updateItem();

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pages
          </h1>
        </div>
        <Table items={items} updateItem={updateItem} />
      </div>
    </AnimatedContainer>
  );
};

export default PagesPage;
