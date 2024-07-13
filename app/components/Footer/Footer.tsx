import {Link} from '~/components';
import {useSettings} from '~/hooks';

export function Footer() {
  const {footer} = useSettings();
  const {link} = {...footer};

  return (
    <footer>
      <div className="flex min-h-[100px] flex-col items-center justify-end p-8">
        {link?.text && (
          <Link className="btn-inverse-dark" to={link.url}>
            {link.text}
          </Link>
        )}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
