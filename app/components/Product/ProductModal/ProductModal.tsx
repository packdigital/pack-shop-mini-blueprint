import {Fragment} from 'react';
import {ProductProvider} from '@shopify/hydrogen-react';
import {Analytics} from '@shopify/hydrogen';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import {CustomAnalyticsEvent} from '~/components';
import {
  useGlobal,
  useProductModal,
  useRootLoaderData,
  useSettings,
} from '~/hooks';

import {ProductModalPanel} from './ProductModalPanel';

export function ProductModal() {
  const {product, selectedVariant} = useRootLoaderData();
  const {closeProductModal} = useProductModal();
  const {modal} = useGlobal();
  const {theme} = useSettings();
  const {bgColor = '#FFFFFF', textColor = '#000000'} = {...theme?.colors};
  const globalModalIsOpen = modal.children !== null;

  return (
    <Transition appear show={!!product && !globalModalIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeProductModal}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)]" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <DialogPanel
            as="aside"
            className="fixed left-1/2 top-1/2 z-50 size-full max-h-[calc(var(--viewport-height,100vh)-1rem)] max-w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
            style={{backgroundColor: bgColor, color: textColor}}
          >
            {product && (
              <ProductProvider
                data={product}
                initialVariantId={selectedVariant?.id || null}
              >
                <ProductModalPanel
                  closeProductModal={closeProductModal}
                  product={product}
                />

                <Analytics.CustomView
                  type={CustomAnalyticsEvent.PRODUCT_QUICK_SHOP_VIEWED}
                  data={{product, selectedVariant}}
                />
              </ProductProvider>
            )}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}

ProductModal.displayName = 'ProductModal';
