import {useEffect} from 'react';

import {LoadingDots} from '~/components';
import {useMarketingListSubscribe} from '~/hooks';

import type {MarketingEmailSignupProps} from './MarketingSignup.types';

export function MarketingEmailSignup({
  listId,
  heading,
  subtext,
  placeholder,
  buttonText = 'Sign Up',
  buttonStyle,
  thankYouText,
  onSuccess,
}: MarketingEmailSignupProps) {
  const {formRef, handleSubmit, message, isSubmitting, submitted} =
    useMarketingListSubscribe({listId});

  useEffect(() => {
    if (submitted && typeof onSuccess === 'function') onSuccess();
  }, [submitted]);

  return (
    <form
      className=" mx-auto w-full max-w-[38rem] text-center"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {heading && (
        <h3 className="theme-heading text-h4 text-current">{heading}</h3>
      )}

      {subtext && <p className="mt-2 text-base">{subtext}</p>}

      <input
        className="theme-input mt-6 w-full"
        name="email"
        placeholder={placeholder}
        required
        type="email"
      />

      <button
        aria-label={buttonText}
        className={`mt-3 w-full ${buttonStyle}`}
        disabled={!listId}
        type="submit"
      >
        <span className={`${isSubmitting ? 'invisible' : 'visible'}`}>
          {buttonText}
        </span>

        {isSubmitting && (
          <LoadingDots
            status="Subscribing"
            withAbsolutePosition
            withStatusRole
          />
        )}
      </button>

      <div className="pointer-events-none mt-6 min-h-6">
        {message && (
          <p className="pointer-events-auto text-base">
            {submitted ? thankYouText : message}
          </p>
        )}
      </div>
    </form>
  );
}

MarketingEmailSignup.displayName = 'MarketingEmailSignup';
