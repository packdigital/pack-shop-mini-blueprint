import {useMemo} from 'react';
import hexToRgba from 'hex-to-rgba';

import {minifyCss} from '~/lib/utils';
import {useTheme} from '~/hooks';
import type {ButtonColorFields} from '~/settings/theme';

const generateButtonStyleCss = ({
  className,
  colors,
  buttonBaseCss,
}: {
  className: string;
  colors?: ButtonColorFields;
  buttonBaseCss: string;
}) => {
  return `
    .${className} {
      ${buttonBaseCss}
      background-color: ${colors?.bgColor};
      color: ${colors?.textColor};
      border-color: ${colors?.borderColor};
    }
    .${className}:hover {
      @media (min-width: 768px) {
        background-color: ${colors?.hoverBgColor};
        color: ${colors?.hoverTextColor};
        border-color: ${colors?.hoverBorderColor};
      }
    }
  `;
};

export function Theme() {
  const theme = useTheme();
  const {
    bgColor,
    bodyFontFamily,
    bodyFontWeight,
    borderColor,
    buttonBorderRadius,
    buttonBorderWidth,
    buttonFontCasing,
    buttonFontFamily,
    buttonFontSize,
    buttonFontWeight,
    buttonHeight,
    buttonLetterSpacing,
    buttonXPadding,
    buttonYPadding,
    cartWidth,
    colorOptionValueBorderColor,
    colorOptionValueBorderWidth,
    colorOptionValueHeight,
    colorOptionValueSelectedBorderColor,
    disabledButtonColors,
    headingFontCasing,
    headingFontFamily,
    headingFontWeight,
    headingTextAlignment,
    inputBgColor,
    inputBorderColor,
    inputBorderRadius,
    inputBorderWidth,
    inputHeight,
    inputLabelFontCasing,
    inputLabelFontSize,
    inputLabelFontWeight,
    inputLabelOffset,
    inputTextColor,
    inputTextFontWeight,
    inputXPadding,
    inputYPadding,
    inverseDarkButtonColors,
    inverseLightButtonColors,
    navDesktopHeight,
    navLogoPercentHeight,
    navMobileHeight,
    optionValueBgColor,
    optionValueBorderColor,
    optionValueBorderRadius,
    optionValueBorderWidth,
    optionValueFontCasing,
    optionValueFontSize,
    optionValueFontWeight,
    optionValueHeight,
    optionValueMinWidth,
    optionValueSelectedBorderColor,
    optionValueTextColor,
    optionValueUnavailBgColor,
    optionValueUnavailBorderColor,
    optionValueUnavailStyle,
    optionValueUnavailStyleColor,
    optionValueUnavailTextColor,
    optionValueXPadding,
    primaryButtonColors,
    promobarDesktopSliderHeight,
    promobarDesktopPadding,
    promobarMobileSliderHeight,
    promobarMobilePadding,
    secondaryButtonColors,
    textColor,
  } = theme;

  const themeCss = useMemo(() => {
    const baseButtonCss = `
      font-size: ${buttonFontSize}px;
      font-family: ${buttonFontFamily}, sans-serif;
      font-weight: ${buttonFontWeight};
      letter-spacing: ${buttonLetterSpacing}px;
      text-transform: ${buttonFontCasing};
      height: ${buttonHeight}px;
      padding: ${buttonYPadding}px ${buttonXPadding}px;
      border-width: ${buttonBorderWidth}px;
      border-style: ${buttonBorderWidth ? 'solid' : 'none'};
      border-radius: ${buttonBorderRadius}px;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    `;
    const mobilePromobarHeight =
      promobarMobileSliderHeight + promobarMobilePadding * 2;
    const desktopPromobarHeight =
      promobarDesktopSliderHeight + promobarDesktopPadding * 2;
    const mobileNavPromobarCombinedHeight =
      navMobileHeight + mobilePromobarHeight;
    const desktopNavPromobarCombinedHeight =
      navDesktopHeight + desktopPromobarHeight;
    const logoHeightFactor =
      navLogoPercentHeight <= 0
        ? 0
        : navLogoPercentHeight >= 100
        ? 1
        : navLogoPercentHeight / 100;

    /* Be hyper aware of correct CSS syntax, e.g. opening/closing curly brackets and trailing semicolons */
    return minifyCss(`
      html {
        font-family: ${bodyFontFamily}, sans-serif;
      }
      body {
        background-color: ${bgColor};
        color: ${textColor};
      }
      .theme-heading, h1, h2, h3, h4, h5, h6 {
        font-family: ${headingFontFamily}, sans-serif;
        text-transform: ${headingFontCasing};
        font-weight: ${headingFontWeight};
      }
      .theme-body, p, a, li, div, span {
        font-family: ${bodyFontFamily}, sans-serif;
        font-weight: ${bodyFontWeight};
      }
      .theme-heading-text-align {
        text-align: ${headingTextAlignment};
        align-items: ${
          headingTextAlignment === 'center' ? 'center' : 'flex-start'
        };
        justify-content: ${
          headingTextAlignment === 'center' ? 'center' : 'flex-start'
        };
      }
      .theme-markdown-heading h1 {
        text-align: ${headingTextAlignment} !important;
      }
      .theme-button {
        ${baseButtonCss}
      }
      .theme-bg-color {
        background-color: ${bgColor};
      }
      .theme-text-color {
        color: ${textColor};
      }
      .theme-text-color-faded {
        color: ${hexToRgba(textColor, 0.6)};
      }
      .theme-border-color {
        border-color: ${borderColor};
      }
      .theme-nav-logo-height {
        height: ${navMobileHeight * logoHeightFactor}px;
        @media (min-width: 768px) {
          height: ${navDesktopHeight * logoHeightFactor}px;
        }
      }
      .theme-nav-height {
        height: ${navMobileHeight}px;
        @media (min-width: 768px) {
          height: ${navDesktopHeight}px;
        }
      }
      .theme-promobar-slider-height {
        height: ${promobarMobileSliderHeight}px;
        @media (min-width: 768px) {
          height: ${promobarDesktopSliderHeight}px;
        }
      }
      .theme-promobar-padding {
        padding: ${promobarMobilePadding}px;
        @media (min-width: 768px) {
          padding: ${promobarDesktopPadding}px;
        }
      }
      .theme-promobar-height {
        height: ${mobilePromobarHeight}px;
        @media (min-width: 768px) {
          height: ${desktopPromobarHeight}px;
        }
      }
      .theme-nav-promobar-combined-height {
        height: ${mobileNavPromobarCombinedHeight}px;
        @media (min-width: 768px) {
          height: ${desktopNavPromobarCombinedHeight}px;
        }
      }
      .theme-main-padding-top-with-nav {
        height: ${mobileNavPromobarCombinedHeight}px;
        @media (min-width: 768px) {
          height: ${desktopNavPromobarCombinedHeight}px;
        }
      }
      .theme-main-padding-top-with-nav-promobar-combined {
        height: ${mobileNavPromobarCombinedHeight}px;
        @media (min-width: 768px) {
          height: ${desktopNavPromobarCombinedHeight}px;
        }
      }
      .theme-pdp-sticky-with-nav {
        @media (min-width: 768px) {
          position: sticky;
          top: ${navDesktopHeight + 40}px;
        }
        @media (min-width: 1280px) {
          position: sticky;
          top: ${navDesktopHeight + 48}px;
        }
      }
      .theme-pdp-sticky-with-nav-promobar-combined {
        @media (min-width: 768px) {
          position: sticky;
          top: ${mobileNavPromobarCombinedHeight + 40}px;
        }
        @media (min-width: 1280px) {
          position: sticky;
          top: ${desktopNavPromobarCombinedHeight + 48}px;
        }
      }
      .theme-drawer-width {
        width: 100%;
        @media (min-width: 768px) {
          width: ${cartWidth}px !important;
        }
      }
      .theme-color-option-value {
        height: ${colorOptionValueHeight}px;
        width: ${colorOptionValueHeight}px;
        border-width: ${colorOptionValueBorderWidth}px;
        border-style: ${colorOptionValueBorderWidth ? 'solid' : 'none'};
        border-color: ${colorOptionValueBorderColor};
        border-radius: 50%;
      }
      .theme-color-option-value-selected {
        border-color: ${colorOptionValueSelectedBorderColor};
      }
      .theme-color-option-value-list-item {
        height: ${colorOptionValueHeight}px;
      }
      .theme-option-value {
        font-size: ${optionValueFontSize}px;
        font-family: ${bodyFontFamily}, sans-serif;
        font-weight: ${optionValueFontWeight};
        text-transform: ${optionValueFontCasing};
        height: ${optionValueHeight}px;
        min-width: ${optionValueMinWidth}px;
        padding: 0px ${optionValueXPadding}px;
        border-width: ${optionValueBorderWidth}px;
        border-style: ${optionValueBorderWidth ? 'solid' : 'none'};
        border-color: ${optionValueBorderColor};
        border-radius: ${optionValueBorderRadius}px;
        background-color: ${optionValueBgColor};
        color: ${optionValueTextColor};
      }
      .theme-option-value-selected {
        border-color: ${optionValueSelectedBorderColor};
      }
      .theme-option-value-unavailable {
        background-color: ${optionValueUnavailBgColor};
        border-color: ${optionValueUnavailBorderColor};
        color: ${optionValueUnavailTextColor};
        text-decoration-line: ${
          optionValueUnavailStyle === 'strikethrough' ? 'line-through' : 'none'
        };
        text-decoration-color: ${optionValueUnavailStyleColor};
      }
      .theme-option-value-unavailable::after {
        display: ${optionValueUnavailStyle === 'slash' ? 'block' : 'none'};
        background-color: ${optionValueUnavailStyleColor};
      }
      .theme-input {
        font-size: 16px;
        font-family: ${bodyFontFamily}, sans-serif;
        font-weight: ${inputTextFontWeight};
        background-color: ${inputBgColor};
        color: ${inputTextColor};
        height: ${inputHeight}px;
        padding: ${inputYPadding}px ${inputXPadding}px;
        border-width: ${inputBorderWidth}px;
        border-style: ${inputBorderWidth ? 'solid' : 'none'};
        border-color: ${inputBorderColor};
        border-radius: ${inputBorderRadius}px;
      }
      .theme-input-label {
        font-size: ${inputLabelFontSize}px;
        font-weight: ${inputLabelFontWeight};
        text-transform: ${inputLabelFontCasing};
        padding-bottom: ${inputLabelOffset}px;
      }
      ${generateButtonStyleCss({
        className: 'theme-btn-primary',
        colors: primaryButtonColors,
        buttonBaseCss: baseButtonCss,
      })}
      ${generateButtonStyleCss({
        className: 'theme-btn-secondary',
        colors: secondaryButtonColors,
        buttonBaseCss: baseButtonCss,
      })}
      ${generateButtonStyleCss({
        className: 'theme-btn-inverse-light',
        colors: inverseLightButtonColors,
        buttonBaseCss: baseButtonCss,
      })}
      ${generateButtonStyleCss({
        className: 'theme-btn-inverse-dark',
        colors: inverseDarkButtonColors,
        buttonBaseCss: baseButtonCss,
      })}
      .theme-btn-disabled, .theme-btn-primary:disabled, .theme-btn-secondary:disabled, .theme-btn-inverse-light:disabled, .theme-btn-inverse-dark:disabled {
        background-color: ${disabledButtonColors.bgColor};
        color: ${disabledButtonColors.textColor};
        border-color: ${disabledButtonColors.borderColor};
      }
        .theme-btn-disabled:hover, .theme-btn-primary:disabled:hover, .theme-btn-secondary:disabled:hover, .theme-btn-inverse-light:disabled:hover, .theme-btn-inverse-dark:disabled:hover {
        background-color: ${disabledButtonColors.bgColor};
        color: ${disabledButtonColors.textColor};
        border-color: ${disabledButtonColors.borderColor};
      }
      .theme-btn-primary > p, .theme-btn-secondary > p, .theme-btn-inverse-light > p, .theme-btn-inverse-dark > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        font-family: ${buttonFontFamily}, sans-serif;
        font-weight: ${buttonFontWeight};
        letter-spacing: ${buttonLetterSpacing}px;
      }
      .theme-btn-primary > span, .theme-btn-secondary > span, .theme-btn-inverse-light > span, .theme-btn-inverse-dark > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        font-family: ${buttonFontFamily}, sans-serif;
        font-weight: ${buttonFontWeight};
        letter-spacing: ${buttonLetterSpacing}px;
      }
    `);
  }, [JSON.stringify(theme)]);

  return (
    <>
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=${headingFontFamily.replaceAll(
          ' ',
          '+',
        )}:wght@300;400;500;600;700&display=swap`}
      />
      {bodyFontFamily !== headingFontFamily && (
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${bodyFontFamily.replaceAll(
            ' ',
            '+',
          )}:wght@300;400;500;600;700&display=swap`}
        />
      )}
      {buttonFontFamily !== headingFontFamily &&
        buttonFontFamily !== bodyFontFamily && (
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${buttonFontFamily.replaceAll(
              ' ',
              '+',
            )}:wght@300;400;500;600;700&display=swap`}
          />
        )}
      <style id="customizer-theme-css">{themeCss}</style>
    </>
  );
}

Theme.displayName = 'Theme';
