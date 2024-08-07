import type {ProductCms} from '~/lib/types';

export interface ProductsGridCms {
  heading: string;
  products: {
    product: ProductCms;
  }[];
  columnsDesktop: string;
  columnsTablet: string;
  columnsMobile: string;
  productItem: {
    enabledStarRating: boolean;
  };
}
