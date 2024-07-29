import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import type {CartDiscountCode} from '@shopify/hydrogen/storefront-api-types';

import {Svg} from '~/components';

export function CartDiscounts() {
  const formRef = useRef<HTMLFormElement>(null);
  const cart = useCart();
  const discountCodes = (cart?.discountCodes || []) as CartDiscountCode[];
  const {discountCodesUpdate} = cart;

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const discountCodesDep = JSON.stringify(discountCodes);

  const codes: string[] = useMemo(() => {
    return (
      discountCodes
        ?.filter((discount) => discount.applicable)
        ?.map(({code}) => code) || []
    );
  }, [discountCodesDep]);

  const handleUpdateCode = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const code = e.currentTarget.code.value;
      if (!code) return;
      if (codes.map((c) => c.toLowerCase()).includes(code.toLowerCase())) {
        setMessage('Discount code is already applied.');
        setTimeout(() => setMessage(''), 3000);
        formRef.current?.reset();
        return;
      }
      discountCodesUpdate([...codes, code]);
      setSubmittedCode(code);
    },
    [codes, discountCodesUpdate],
  );

  const handleClearCode = useCallback(
    (code: string) => {
      discountCodesUpdate(codes.filter((c) => c !== code));
    },
    [codes, discountCodesUpdate],
  );

  useEffect(() => {
    if (!submittedCode) return;
    const codeisApplicable = discountCodes?.find(
      (discount) => discount.code === submittedCode,
    )?.applicable;
    if (codeisApplicable) {
      setMessage('');
      setSubmittedCode(null);
      formRef.current?.reset();
    } else {
      setSubmittedCode(null);
      setMessage('Discount code is not applicable to your cart.');
      setTimeout(() => setMessage(''), 3000);
    }
  }, [discountCodesDep]);

  return (
    <div className="theme-border-color flex flex-col gap-2 border-t p-4">
      <form
        ref={formRef}
        className="theme-border-color flex h-10 items-center justify-between overflow-hidden rounded border"
        onSubmit={handleUpdateCode}
      >
        <input
          type="text"
          name="code"
          placeholder="Discount code"
          id="cart-discount-code"
          className="flex-1 p-2 text-base"
        />
        <label htmlFor="cart-discount-code" className="sr-only">
          Discount code
        </label>
        <button
          type="submit"
          className="theme-border-color h-full border-l px-2 text-sm transition md:hover:bg-neutral-50"
        >
          Apply
        </button>
      </form>

      {message && (
        <div className="text-xs text-red-500" role="alert">
          {message}
        </div>
      )}

      {codes.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {codes.map((code) => {
            return (
              <li key={code}>
                <button
                  className="flex max-w-full items-center gap-1 rounded-full bg-neutral-50 py-2 pl-2.5 pr-3 text-xs uppercase transition md:hover:bg-neutral-200"
                  onClick={() => handleClearCode(code)}
                  type="button"
                >
                  <Svg
                    className="w-3"
                    src="/svgs/discount.svg#discount"
                    title="Discount"
                    viewBox="0 0 24 24"
                  />

                  <div className="flex-1 truncate">{code}</div>

                  <Svg
                    className="theme-text-color w-2.5"
                    src="/svgs/close.svg#close"
                    title="Close"
                    viewBox="0 0 24 24"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

CartDiscounts.displayName = 'CartDiscounts';
