import {Spinner, Svg} from '~/components';

interface QuantitySelectorProps {
  className?: string;
  disabled?: boolean;
  disableDecrement?: boolean;
  disableIncrement?: boolean;
  handleDecrement: () => void;
  handleIncrement: () => void;
  hideButtons?: boolean;
  isUpdating?: boolean;
  productTitle?: string;
  quantity: number;
  style?: React.CSSProperties;
}

export function QuantitySelector({
  className = '',
  disabled = false,
  disableDecrement = false,
  disableIncrement = false,
  handleDecrement,
  handleIncrement,
  hideButtons = false,
  isUpdating = false,
  productTitle = 'product',
  quantity = 1,
  style,
}: QuantitySelectorProps) {
  return (
    <div
      className={`theme-button theme-border-color flex w-full min-w-16 max-w-[6.5rem] items-center justify-between p-0 ${className}`}
      style={style}
    >
      <button
        aria-label={`Reduce quantity of ${productTitle} by 1 to ${
          quantity - 1
        }`}
        className={`relative h-full w-10 transition disabled:opacity-50 ${
          hideButtons ? 'invisible' : ''
        } ${disableDecrement ? 'cursor-not-allowed' : ''}`}
        disabled={disabled || isUpdating || disableDecrement}
        onClick={handleDecrement}
        type="button"
      >
        <Svg
          className="theme-text-color absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2"
          src="/svgs/minus.svg#minus"
          title="Minus"
          viewBox="0 0 24 24"
        />
      </button>

      <div className="relative flex flex-1 items-center justify-center">
        {isUpdating ? (
          <Spinner color="var(--medium-gray)" width="20" />
        ) : (
          <p className="w-full text-center outline-none">{quantity}</p>
        )}
      </div>

      <button
        aria-label={`Increase quantity of ${productTitle} by 1 to ${
          quantity + 1
        }`}
        className={`relative h-full w-10 transition disabled:opacity-50 ${
          hideButtons ? 'invisible' : ''
        } ${disableIncrement ? 'cursor-not-allowed' : ''}`}
        disabled={disabled || isUpdating || disableIncrement}
        onClick={handleIncrement}
        type="button"
      >
        <Svg
          className="theme-text-color absolute left-1/2 top-1/2 w-4 -translate-x-1/2 -translate-y-1/2"
          src="/svgs/plus.svg#plus"
          title="Plus"
          viewBox="0 0 24 24"
        />
      </button>
    </div>
  );
}

QuantitySelector.displayName = 'QuantitySelector';
