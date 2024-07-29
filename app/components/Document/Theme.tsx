import hexToRgba from 'hex-to-rgba';

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
  const {
    bgColor,
    textColor,
    borderColor,
    headingFontFamily,
    headingFontWeight,
    headingFontCasing,
    bodyFontFamily,
    bodyFontWeight,
    primaryButtonColors,
    secondaryButtonColors,
    inverseLightButtonColors,
    inverseDarkButtonColors,
    disabledButtonColors,
    buttonLetterSpacing,
    buttonFontFamily,
    buttonFontWeight,
    baseButtonCss,
    baseColorOptionValueCss,
    baseInputCss,
    baseOptionValueCss,
    inputLabelFontSize,
    inputLabelFontWeight,
    inputLabelFontCasing,
    optionValueUnavailBgColor,
    optionValueUnavailBorderColor,
    optionValueUnavailTextColor,
    optionValueUnavailStyle,
    optionValueUnavailStyleColor,
  } = useTheme();

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
      <style id="customizer-theme-css">
        {`
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
          .theme-color-option-value {
            ${baseColorOptionValueCss}
          }
          .theme-option-value {
            ${baseOptionValueCss}
          }
          .theme-option-value-unavailable {
            background-color: ${optionValueUnavailBgColor};
            border-color: ${optionValueUnavailBorderColor};
            color: ${optionValueUnavailTextColor};
            text-decoration-line: ${
              optionValueUnavailStyle === 'strikethrough'
                ? 'line-through'
                : 'none'
            };
            text-decoration-color: ${optionValueUnavailStyleColor};
          }
          .theme-option-value-unavailable::after {
            display: ${optionValueUnavailStyle === 'slash' ? 'block' : 'none'};
            background-color: ${optionValueUnavailStyleColor};
          }
          .theme-input {
            ${baseInputCss}
          }
          .theme-input-label {
            font-size: ${inputLabelFontSize}px;
            font-weight: ${inputLabelFontWeight};
            text-transform: ${inputLabelFontCasing};
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
        `}
      </style>
    </>
  );
}

Theme.displayName = 'Theme';
