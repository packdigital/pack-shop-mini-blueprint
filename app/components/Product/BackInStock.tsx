import {useEffect, useState} from 'react';
import {parseGid} from '@shopify/hydrogen';

import {LoadingDots} from '~/components';
import {useBackInStock, useGlobal, useSettings} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

interface BackInStockModalProps {
  selectedVariant: SelectedVariant;
}

export function BackInStock({selectedVariant}: BackInStockModalProps) {
  const {product: productSettings} = useSettings();
  const {closeModal} = useGlobal();
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
        closeModal();
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
        className="flex w-full items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({email, variantId});
        }}
      >
        <input
          className="input-text text-text md:max-w-screen-xs"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          required
          type="email"
          value={email}
        />

        <button
          aria-label="Notify Me"
          className="relative max-md:w-full"
          type="submit"
        >
          <span className={`${isSubmitting ? 'invisible' : ''}`}>
            {submitText}
          </span>

          {isSubmitting && (
            <span
              aria-label="Subscribing"
              aria-live="assertive"
              role="status"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <LoadingDots />
            </span>
          )}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

BackInStock.displayName = 'BackInStock';
