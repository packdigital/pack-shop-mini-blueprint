import {useEffect, useMemo, useRef, useState} from 'react';
import {parseGid} from '@shopify/hydrogen';

import {Spinner} from '~/components';
import {useBackInStock, useSettings} from '~/hooks';

import type {BackInStockModalProps} from './Product.types';

export function BackInStock({
  isFocused,
  selectedVariant,
}: BackInStockModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {product: productSettings} = useSettings();
  const {
    handleSubmit,
    isSubmitting,
    message: apiMessage,
    submittedAt,
    success,
  } = useBackInStock();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {heading, subtext, submitText, successText} = {
    ...productSettings?.backInStock,
  };

  const options = useMemo(() => {
    if (!selectedVariant) return '';
    return selectedVariant?.selectedOptions
      ?.map((option) => {
        return `${option.name}: ${option.value}`;
      })
      .join(', ');
  }, [selectedVariant]);

  useEffect(() => {
    if (!submittedAt) return;
    if (success) {
      setEmail('');
      setMessage(successText || apiMessage || 'Thank you!');
      setTimeout(() => {
        setMessage('');
      }, 2500);
    } else {
      setMessage(apiMessage || 'Something went wrong. Please try again later.');
    }
  }, [submittedAt]);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
      ref.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [isFocused]);

  const {id: variantId} = parseGid(selectedVariant?.id);

  return (
    <div className="flex flex-col gap-4" ref={ref}>
      <div>
        <h2 className="text-h5 theme-heading">{heading}</h2>
        {subtext && <p className="mt-2">{subtext}</p>}
      </div>

      <div>
        <form
          className="theme-border-color flex h-12 items-center justify-between overflow-hidden rounded border"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({email, variantId});
          }}
        >
          <input
            className="flex-1 px-3.5 py-2.5 text-base"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            type="email"
            value={email}
            ref={inputRef}
          />

          <button
            aria-label="Notify Me"
            className="theme-border-color relative h-full border-l px-2 text-sm transition md:hover:bg-neutral-50"
            type="submit"
          >
            <span className={`${isSubmitting ? 'invisible' : 'visible'}`}>
              {submitText}
            </span>

            {isSubmitting && (
              <span className="absolute-center">
                <Spinner width="20" />
              </span>
            )}
          </button>
        </form>

        {options && <p className="mt-2 text-xs">{options}</p>}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

BackInStock.displayName = 'BackInStock';
