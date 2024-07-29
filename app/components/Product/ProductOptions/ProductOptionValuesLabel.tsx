import {useCallback} from 'react';

import {useGlobal} from '~/hooks';

interface ProductOptionValuesLabelProps {
  isShoppableProductCard?: boolean;
  name: string;
  selectedValue: string | null;
}

export function ProductOptionValuesLabel({
  isShoppableProductCard,
  name,
  selectedValue,
}: ProductOptionValuesLabelProps) {
  const {openModal} = useGlobal();

  const handleSizeGuideClick = useCallback(() => {
    // example modal
    openModal(
      <div>
        <h2 className="text-h3 theme-heading mb-6 text-center">Size Guide</h2>
        <div className="h-[30rem] bg-neutral-50" />
      </div>,
    );
  }, []);

  return (
    <div
      className={`mb-2 flex items-center justify-between gap-2 ${
        isShoppableProductCard ? 'theme-product-option-label' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-nav theme-body leading-6">{name}</h3>

        {selectedValue && (
          <p className="theme-text-color-faded text-base">{selectedValue}</p>
        )}
      </div>

      {name === 'Size' && (
        <button
          className="text-underline theme-text-color-faded text-xs"
          onClick={handleSizeGuideClick}
          type="button"
        >
          Size Guide
        </button>
      )}
    </div>
  );
}

ProductOptionValuesLabel.displayName = 'ProductOptionValuesLabel';
