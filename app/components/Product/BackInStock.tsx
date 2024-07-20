import {useEffect, useState} from 'react';
import {parseGid} from '@shopify/hydrogen';

import {Spinner} from '~/components';
import {useBackInStock, useSettings} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

interface BackInStockModalProps {
  selectedVariant: SelectedVariant;
}

export function BackInStock({selectedVariant}: BackInStockModalProps) {
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

  const {id: variantId} = parseGid(selectedVariant?.id);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-h5">{heading}</h2>
        {subtext && <p className="mt-2">{subtext}</p>}
      </div>

      <form
        className="flex h-12 items-center justify-between overflow-hidden rounded border border-border"
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
        />

        <button
          aria-label="Notify Me"
          className="relative h-full border-l border-border px-2 text-sm transition md:hover:bg-offWhite"
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

      {message && <p>{message}</p>}
    </div>
  );
}

BackInStock.displayName = 'BackInStock';
