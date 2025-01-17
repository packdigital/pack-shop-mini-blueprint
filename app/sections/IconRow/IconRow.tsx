import {Container, Image, Markdown, Svg} from '~/components';

import type {IconRowCms} from './IconRow.types';
import {Schema} from './IconRow.schema';

export function IconRow({cms}: {cms: IconRowCms}) {
  const {heading, icons, section, subtext} = cms;
  const {fullWidth, textColor = '#000000'} = {...section};
  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <Container container={cms.container}>
      <div
        className="px-contained py-contained flex flex-col items-center"
        style={{color: textColor}}
      >
        <div
          className={`flex w-full flex-col items-center gap-4 text-center md:gap-6 ${maxWidthClass}`}
        >
          <div className="theme-heading-text-align flex flex-col gap-4">
            {heading && (
              <h2 className="text-h2 theme-heading max-w-[46rem]">{heading}</h2>
            )}

            {subtext && (
              <div className="max-w-[46rem] [&_a]:underline [&_h1]:text-base [&_h2]:text-base [&_h3]:text-base [&_h4]:text-base [&_h5]:text-base [&_h6]:text-base [&_p]:text-base">
                <Markdown>{subtext}</Markdown>
              </div>
            )}
          </div>

          {icons?.length > 0 && (
            <ul className="mt-4 flex flex-wrap justify-center">
              {icons.map(({icon, alt, label}, index) => {
                return (
                  <li
                    key={index}
                    className="flex max-w-64 grow basis-1/2 flex-col items-center p-4 text-center md:basis-1/6"
                  >
                    {icon?.url && (
                      <Image
                        data={{
                          altText: icon.altText || alt || label,
                          url: icon.url,
                          width: icon.width,
                          height: icon.height,
                        }}
                        aspectRatio={
                          icon.width && icon.height
                            ? `${icon.width}/${icon.height}`
                            : '1/1'
                        }
                        className="bg-transparent"
                        width="48px"
                      />
                    )}

                    {label && <p className="mt-3 font-bold">{label}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
}

IconRow.displayName = 'IconRow';
IconRow.Schema = Schema;
