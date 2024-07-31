import {Fragment, useState} from 'react';
import {TabGroup, TabPanels, TabPanel} from '@headlessui/react';

import {Container, Link, TilesSlider} from '~/components';

import {Schema} from './TabbedTilesSlider.schema';
import {TabbedTilesSliderTabs} from './TabbedTilesSliderTabs';
import type {TabbedTilesSliderCms} from './TabbedTilesSlider.types';

export function TabbedTilesSlider({cms}: {cms: TabbedTilesSliderCms}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const {button, header, section, tabs} = cms;
  const {heading, subheading} = {...header};
  const {
    aspectRatio,
    buttonStyle = 'theme-btn-primary',
    fullWidth,
    textAlign,
    textColor = '#000000',
    tileHeadingSize,
    tilesPerViewDesktop,
    tilesPerViewMobile,
    tilesPerViewTablet,
  } = {...section};
  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <Container container={cms.container}>
      <div className="lg:px-contained py-contained flex flex-col items-center overflow-x-clip">
        {(!!heading || !!subheading) && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mb-6 flex w-full flex-col gap-2 md:mb-10 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {heading && <h2 className="text-h2 theme-heading">{heading}</h2>}
            {subheading && (
              <span className="text-body-lg max-w-[46rem]">{subheading}</span>
            )}
          </div>
        )}

        <TabGroup
          as="div"
          className="w-full"
          selectedIndex={activeTabIndex}
          onChange={setActiveTabIndex}
        >
          <TabbedTilesSliderTabs
            activeTabIndex={activeTabIndex}
            maxWidthClass={maxWidthClass}
            tabs={tabs}
            textColor={textColor}
          />

          <TabPanels as={Fragment}>
            {tabs?.length > 0 &&
              tabs.map(({tiles}, index) => {
                return (
                  <TabPanel as={Fragment} key={index}>
                    <TilesSlider
                      aspectRatio={aspectRatio}
                      maxWidthClass={maxWidthClass}
                      textAlign={textAlign}
                      textColor={textColor}
                      tileHeadingSize={tileHeadingSize}
                      tiles={tiles}
                      tilesPerViewDesktop={tilesPerViewDesktop}
                      tilesPerViewMobile={tilesPerViewMobile}
                      tilesPerViewTablet={tilesPerViewTablet}
                    />
                  </TabPanel>
                );
              })}
          </TabPanels>
        </TabGroup>

        {button?.text && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mt-10 flex w-full flex-col ${maxWidthClass}`}
          >
            <Link
              aria-label={button.text}
              className={`${buttonStyle}`}
              to={button.url}
              newTab={button.newTab}
              type={button.type}
            >
              {button.text}
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

TabbedTilesSlider.displayName = 'TabbedTilesSlider';
TabbedTilesSlider.Schema = Schema;
