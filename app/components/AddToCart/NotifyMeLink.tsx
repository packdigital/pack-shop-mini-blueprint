import {Link} from '~/components';
import {useProductModal} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

export function NotifyMeLink({
  buttonText = 'Notify Me When Available',
  buttonClassName = '',
  selectedVariant,
}: {
  buttonText?: string;
  buttonClassName?: string;
  selectedVariant: SelectedVariant;
}) {
  const {openProductUrl} = useProductModal({
    selectedVariant,
    additionalParams: {notifyMeFocused: 'true'},
  });

  return (
    <Link
      aria-label={buttonText}
      className={buttonClassName}
      to={openProductUrl}
    >
      {buttonText}
    </Link>
  );
}

NotifyMeLink.displayName = 'NotifyMeLink';
