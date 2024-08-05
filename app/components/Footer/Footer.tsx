import {Markdown} from '~/components';
import {footerDefaults} from '~/settings/footer';
import {useSettings} from '~/hooks';

export function Footer() {
  const {footer} = useSettings();
  const {
    subtext,
    subtextFontSize = footerDefaults.subtextFontSize,
    textAlignment = footerDefaults.textAlignment,
  } = {...footer};

  return (
    <footer className="theme-footer">
      <div className="flex w-full flex-col gap-3">
        {subtext && (
          <Markdown
            centerAllText={textAlignment === 'center'}
            style={{fontSize: `${subtextFontSize}px`}}
          >
            {subtext}
          </Markdown>
        )}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
