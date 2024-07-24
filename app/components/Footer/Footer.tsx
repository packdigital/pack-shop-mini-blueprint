import {Markdown} from '~/components';
import {useSettings} from '~/hooks';

export function Footer() {
  const {footer} = useSettings();
  const {subtext} = {...footer};

  return (
    <footer>
      <div className="flex min-h-[100px] flex-col items-center justify-end gap-3 p-8">
        {subtext && <Markdown centerAllText>{subtext}</Markdown>}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
