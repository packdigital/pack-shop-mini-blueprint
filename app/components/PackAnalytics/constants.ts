import {AnalyticsEvent} from '@shopify/hydrogen';

// PAGE_VIEWED: "page_viewed";
// PRODUCT_VIEWED: "product_viewed";
// COLLECTION_VIEWED: "collection_viewed";
// CART_VIEWED: "cart_viewed";
// SEARCH_VIEWED: "search_viewed";
// CART_UPDATED: "cart_updated";
// PRODUCT_ADD_TO_CART: "product_added_to_cart";
// PRODUCT_REMOVED_FROM_CART: "product_removed_from_cart";
// CUSTOM_EVENT: `custom_${string}`;

export const PackEventName = {
  ...AnalyticsEvent,
  PRODUCT_ITEM_CLICKED: 'custom_product_item_clicked',
  PRODUCT_QUICK_SHOP_VIEWED: 'custom_product_quick_shop_viewed',
  CUSTOMER_SUBSCRIBED: 'custom_customer_subscribed',
} as typeof AnalyticsEvent & {
  PRODUCT_ITEM_CLICKED: 'custom_product_item_clicked';
  PRODUCT_QUICK_SHOP_VIEWED: 'custom_product_quick_shop_viewed';
  CUSTOMER_SUBSCRIBED: 'custom_customer_subscribed';
};
