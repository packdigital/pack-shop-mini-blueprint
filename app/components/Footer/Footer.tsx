import {Link, Markdown} from '~/components';
import {useSettings} from '~/hooks';

export function Footer() {
  const {footer} = useSettings();
  const {link, subtext} = {...footer};

  return (
    <footer>
      <div className="flex min-h-[100px] flex-col items-center justify-end gap-3 p-8">
        {link?.text && (
          <Link className="btn-inverse-dark" to={link.url}>
            {link.text}
          </Link>
        )}

        {subtext && <Markdown centerAllText>{subtext}</Markdown>}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
