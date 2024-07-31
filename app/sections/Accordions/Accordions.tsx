import {Container} from '~/components';

import {Accordion} from './Accordion';
import type {AccordionsCms} from './Accordions.types';
import {Schema} from './Accordions.schema';

export function Accordions({cms}: {cms: AccordionsCms}) {
  const {accordions, heading, headerBgColor, headerTextColor} = cms;

  return (
    <Container container={cms.container}>
      <div className="px-contained my-4 flex flex-col items-center md:my-8 xl:my-12">
        <div className="w-full max-w-[50rem]">
          {!!heading && (
            <h2 className="theme-heading-text-align text-h2 theme-heading mb-4">
              {heading}
            </h2>
          )}

          <ul className="grid grid-cols-1 gap-4">
            {accordions?.map((accordion, index) => {
              return (
                <li key={index}>
                  <Accordion
                    accordion={accordion}
                    headerBgColor={headerBgColor}
                    headerTextColor={headerTextColor}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}

Accordions.displayName = 'Accordions';
Accordions.Schema = Schema;
