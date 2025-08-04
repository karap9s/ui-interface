'use client';

import { createSelectors } from '@/src/components/shared/configs/store';
import { useProductsStore } from '@/src/components/entities/products';
import { Table } from '@/src/components/widgets/Table';
import AnimatedContainer from '@/src/components/shared/ui/AnimatedContainer';

const ProductsPage = () => {
  const productsStore = createSelectors(useProductsStore);
  const items = productsStore.use.items();
  const updateItem = productsStore.use.updateItem();

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Products
          </h1>
        </div>
        <Table items={items} updateItem={updateItem} />
      </div>
    </AnimatedContainer>
  );
};

export default ProductsPage;
