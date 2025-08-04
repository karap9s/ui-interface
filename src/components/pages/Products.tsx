'use client';

import { createSelectors } from '@/src/components/shared/configs/store';
import { useProductsStore } from '@/src/components/entities/products';
import { Table } from '@/src/components/widgets/Table';

const ProductsPage = () => {
  const productsStore = createSelectors(useProductsStore);
  const items = productsStore.use.items();
  const updateItem = productsStore.use.updateItem();

  return <Table items={items} updateItem={updateItem} />;
};

export default ProductsPage;
