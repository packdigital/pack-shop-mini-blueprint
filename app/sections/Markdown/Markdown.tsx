import {Container, Markdown as MarkdownComp} from '~/components';
import type {ColorHexCode} from '~/lib/types';
import type {ContainerSettings} from '~/settings/container';

import {Schema} from './Markdown.schema';

interface MarkdownCms {
  centerAllText: boolean;
  content: string;
  section: {
    maxWidth: string;
    textColor: ColorHexCode;
  };
  container: ContainerSettings;
}

export function Markdown({cms}: {cms: MarkdownCms}) {
  const {centerAllText, content, section} = cms;
  const {maxWidth, textColor = '#000000'} = {...section};

  return (
    <Container container={cms.container}>
      <div className="px-contained py-contained">
        <div className={`mx-auto ${maxWidth}`} style={{color: textColor}}>
          <MarkdownComp centerAllText={centerAllText}>{content}</MarkdownComp>
        </div>
      </div>
    </Container>
  );
}

Markdown.displayName = 'Markdown';
Markdown.Schema = Schema;
