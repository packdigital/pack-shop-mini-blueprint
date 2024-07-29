import {useEffect, useState, useCallback} from 'react';
import {useCart} from '@shopify/hydrogen-react';

import {Container} from '~/components';
import {useLoadScript, useGlobal} from '~/hooks';

import type {FireworkCms} from './Firework.types';
import {Schema} from './Firework.schema';

export const Firework = ({cms}: {cms: FireworkCms}) => {
  const {
    heading,
    subheading,
    playlistId,
    showCaptions,
    type = 'carousel',
    section,
  } = cms;
  const {fullWidth, textColor: headingTextColor, bodyTextColor} = {...section};

  const {linesAdd, status, id: cartId} = useCart();
  const {openCart} = useGlobal();

  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  useLoadScript({
    id: 'firework-script-carousel',
    src: 'https://asset.fwcdn3.com/js/embed-feed.js',
  });

  useLoadScript({
    id: 'firework-script-storyblock',
    src: 'https://asset.fwcdn3.com/js/storyblock.js',
  });

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isAdding && status === 'idle') {
      setIsAdding(false);
      openCart();
      if (window._fwn.player) {
        _fwn.player.close();
      }
    }
  }, [status, isAdding]);

  const addToCartHandler = useCallback(
    async (variant) => {
      setIsAdding(true);
      const addItem = {
        merchandiseId: `gid://shopify/ProductVariant/${variant.id}`,
        quantity: 1,
      };
      linesAdd([addItem]);
    },
    [linesAdd, status, cartId],
  );

  const primaryCtaClickedHandler = (event) => {
    const variant = event?.detail?.product_unit;
    const product = event?.detail?.product;

    const item = {
      product: {
        id: product?.product_ext_id,
        handle: product?.product_handle,
        title: product?.product_name,
      },
      id: variant?.unit_ext_id,
      title: variant?.unit_name,
      image: {
        url: product?.product_images?.[0]?.image_src,
      },
      brand: 'Liquid I.V.',
      price: {
        amount: variant?.unit_price,
      },
    };
    if (item.id) {
      addToCartHandler(item);
    }
  };

  const hydrateProducts = (event) => {
    const {products, actions} = event.detail;
    for (const product of products) {
      actions.shopping.hydrateProduct(({productFactory}) => {
        return productFactory((p) => {
          const newProduct = p.extId(product.product_ext_id);
          for (const [i, variant] of product.product_units.entries()) {
            newProduct.variant((v) => {
              const newVariant = v
                .extId(variant.unit_ext_id)
                .url(
                  variant.unit_url.replace(
                    /https:\/\/([a-z0-9-]*)?.myshopify.com/,
                    window.origin,
                  ),
                );
              return newVariant;
            });
          }
          return newProduct;
        });
      });
    }
  };

  useEffect(() => {
    document.addEventListener(
      'fw:shopping:pdp-primary-cta-clicked',
      primaryCtaClickedHandler,
    );

    document.addEventListener('fw:shopping:hydrate-products', hydrateProducts);

    return () => {
      document.removeEventListener(
        'fw:shopping:pdp-primary-cta-clicked',
        primaryCtaClickedHandler,
      );

      document.removeEventListener(
        'fw:shopping:hydrate-products',
        hydrateProducts,
      );
    };
  }, []);

  return (
    <Container container={cms.container}>
      <div className="py-contained px-contained">
        <div className={`mx-auto ${maxWidthClass}`}>
          <div className="mb-10 max-w-[640px]">
            {heading && (
              <h2
                className="text-h2 theme-heading max-md:mb-3"
                style={{color: headingTextColor}}
              >
                {heading}
              </h2>
            )}

            {subheading && <p style={{color: bodyTextColor}}>{subheading}</p>}
          </div>

          <div>
            {/* Carousel */}
            {type === 'carousel' && (
              <fw-embed-feed
                channel="liquidiv"
                playlist={playlistId}
                mode="row"
                open_in="default"
                max_videos="0"
                placement="middle"
                player_placement="bottom-left"
                branding="false"
                captions={showCaptions}
                pip_navigate="false"
              />
            )}

            {/* Storyblock */}
            {type === 'storyblock' && (
              <fw-storyblock
                channel="liquidiv"
                playlist={playlistId}
                autoplay="true"
                branding="false"
                player_detached="true"
                pip_navigate="false"
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

Firework.displayName = 'Firework';
Firework.Schema = Schema;
