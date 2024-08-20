import {ProductOptionValuesLabel} from './ProductOptionValuesLabel';
import {ProductOptionValue} from './ProductOptionValue';
import type {ProductOptionValuesProps} from './ProductOptions.types';

export function ProductOptionValues({
  isShoppableProductCard,
  onSelect,
  option,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatches,
}: ProductOptionValuesProps) {
  const {name = '', optionValues} = {...option};

  return (
    <div>
      <ProductOptionValuesLabel
        isShoppableProductCard={isShoppableProductCard}
        name={name}
        product={product}
        selectedValue={selectedOptionsMap?.[name]}
      />

      <ul
        className={`flex flex-wrap gap-2 ${
          isShoppableProductCard ? 'theme-product-option-values' : ''
        }`}
      >
        {optionValues?.map((optionValue) => {
          const isColor = name === swatches?.swatchOptionName;
          return (
            <li
              key={optionValue.name}
              className={`${
                isColor ? 'theme-color-option-value-list-item' : ''
              }`}
            >
              <ProductOptionValue
                name={name}
                onSelect={onSelect}
                product={product}
                selectedOptionsMap={selectedOptionsMap}
                setSelectedOption={setSelectedOption}
                swatches={swatches}
                optionValue={optionValue}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ProductOptionValues.displayName = 'ProductOptionValues';
