import {useMemo} from 'react';

import {useSettings} from '~/hooks';
import {
  buttonDefaults,
  colorsDefaults,
  disabledButtonColorDefaults,
  fontsDefaults,
  inputDefaults,
  inverseDarkButtonColorDefaults,
  inverseLightButtonColorDefaults,
  primaryButtonColorDefaults,
  productOptionValueDefaults,
  secondaryButtonColorDefaults,
} from '~/settings/theme';
import type {ColorHexCode} from '~/lib/types';
import type {ButtonColorFields} from '~/settings/theme';

const generateButtonColors = ({
  colors,
  defaults,
}: {
  colors?: ButtonColorFields;
  defaults: Record<string, string>;
}) => ({
  bgColor: (colors?.bgColor || defaults.bgColor) as ColorHexCode,
  borderColor: (colors?.borderColor || defaults.borderColor) as ColorHexCode,
  textColor: (colors?.textColor || defaults.textColor) as ColorHexCode,
  hoverBgColor: (colors?.hoverBgColor || defaults.hoverBgColor) as ColorHexCode,
  hoverBorderColor: (colors?.hoverBorderColor ||
    defaults.hoverBorderColor) as ColorHexCode,
  hoverTextColor: (colors?.hoverTextColor ||
    defaults.hoverTextColor) as ColorHexCode,
});

export function useTheme() {
  const {theme} = useSettings();
  return useMemo(() => {
    const {
      bgColor = colorsDefaults.bgColor,
      textColor = colorsDefaults.textColor,
      borderColor = colorsDefaults.borderColor,
    } = {...theme?.colors};
    const {
      headingFontFamily = fontsDefaults.headingFontFamily,
      headingFontWeight = fontsDefaults.headingFontWeight,
      headingFontCasing = fontsDefaults.headingFontCasing,
      bodyFontFamily = fontsDefaults.bodyFontFamily,
      bodyFontWeight = fontsDefaults.bodyFontWeight,
    } = {...theme?.fonts};
    const {button, primary, secondary, inverseLight, inverseDark, disabled} = {
      ...theme?.buttons,
    };
    const {
      fontSize: buttonFontSize = buttonDefaults.fontSize,
      letterSpacing: buttonLetterSpacing = buttonDefaults.letterSpacing,
      fontFamily: buttonFontFamily = buttonDefaults.fontFamily,
      fontWeight: buttonFontWeight = buttonDefaults.fontWeight,
      fontCasing: buttonFontCasing = buttonDefaults.fontCasing,
      height: buttonHeight = buttonDefaults.height,
      xPadding: buttonXPadding = buttonDefaults.xPadding,
      yPadding: buttonYPadding = buttonDefaults.yPadding,
      borderWidth: buttonBorderWidth = buttonDefaults.borderWidth,
      borderRadius: buttonBorderRadius = buttonDefaults.borderRadius,
    } = {...button};
    const colorOptionValueDefaults =
      productOptionValueDefaults.colorOptionValues;
    const optionValueDefaults = productOptionValueDefaults.optionValues;
    const {colorOptionValues, optionValues} = {...theme?.productOptionValues};
    const {
      height: colorOptionValueHeight = colorOptionValueDefaults.height,
      borderColor:
        colorOptionValueBorderColor = colorOptionValueDefaults.borderColor,
      borderWidth:
        colorOptionValueBorderWidth = colorOptionValueDefaults.borderWidth,
    } = {...colorOptionValues};
    const {
      fontSize: optionValueFontSize = optionValueDefaults.fontSize,
      fontWeight: optionValueFontWeight = optionValueDefaults.fontWeight,
      fontCasing: optionValueFontCasing = optionValueDefaults.fontCasing,
      height: optionValueHeight = optionValueDefaults.height,
      minWidth: optionValueMinWidth = optionValueDefaults.minWidth,
      xPadding: optionValueXPadding = optionValueDefaults.xPadding,
      borderWidth: optionValueBorderWidth = optionValueDefaults.borderWidth,
      borderRadius: optionValueBorderRadius = optionValueDefaults.borderRadius,
      bgColor: optionValueBgColor = optionValueDefaults.bgColor,
      borderColor: optionValueBorderColor = optionValueDefaults.borderColor,
      textColor: optionValueTextColor = optionValueDefaults.textColor,
      unavailBgColor:
        optionValueUnavailBgColor = optionValueDefaults.unavailBgColor,
      unavailBorderColor:
        optionValueUnavailBorderColor = optionValueDefaults.unavailBorderColor,
      unavailTextColor:
        optionValueUnavailTextColor = optionValueDefaults.unavailTextColor,
      unavailStyle: optionValueUnavailStyle = optionValueDefaults.unavailStyle,
      unavailStyleColor:
        optionValueUnavailStyleColor = optionValueDefaults.unavailStyleColor,
    } = {...optionValues};
    const {
      bgColor: inputBgColor = inputDefaults.bgColor,
      borderColor: inputBorderColor = inputDefaults.borderColor,
      textColor: inputTextColor = inputDefaults.textColor,
      textFontWeight: inputTextFontWeight = inputDefaults.textFontWeight,
      height: inputHeight = inputDefaults.height,
      xPadding: inputXPadding = inputDefaults.xPadding,
      yPadding: inputYPadding = inputDefaults.yPadding,
      borderWidth: inputBorderWidth = inputDefaults.borderWidth,
      borderRadius: inputBorderRadius = inputDefaults.borderRadius,
      labelFontSize: inputLabelFontSize = inputDefaults.labelFontSize,
      labelFontWeight: inputLabelFontWeight = inputDefaults.labelFontWeight,
      labelFontCasing: inputLabelFontCasing = inputDefaults.labelFontCasing,
    } = {...theme?.inputs};
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
    const baseColorOptionValueCss = `
      height: ${colorOptionValueHeight}px;
      width: ${colorOptionValueHeight}px;
      border-width: ${colorOptionValueBorderWidth}px;
      border-style: ${colorOptionValueBorderWidth ? 'solid' : 'none'};
      border-color: ${colorOptionValueBorderColor};
      border-radius: 50%;
    `;
    const baseOptionValueCss = `
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
    `;
    const baseInputCss = `
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
    `;
    const primaryButtonColors = generateButtonColors({
      colors: primary,
      defaults: primaryButtonColorDefaults,
    });
    const secondaryButtonColors = generateButtonColors({
      colors: secondary,
      defaults: secondaryButtonColorDefaults,
    });
    const inverseLightButtonColors = generateButtonColors({
      colors: inverseLight,
      defaults: inverseLightButtonColorDefaults,
    });
    const inverseDarkButtonColors = generateButtonColors({
      colors: inverseDark,
      defaults: inverseDarkButtonColorDefaults,
    });
    const disabledButtonColors = {
      bgColor: disabled?.bgColor || disabledButtonColorDefaults.bgColor,
      borderColor:
        disabled?.borderColor || disabledButtonColorDefaults.borderColor,
      textColor: disabled?.textColor || disabledButtonColorDefaults.textColor,
    };

    return {
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
      buttonFontSize,
      buttonLetterSpacing,
      buttonFontFamily,
      buttonFontWeight,
      buttonFontCasing,
      buttonHeight,
      buttonXPadding,
      buttonYPadding,
      buttonBorderRadius,
      baseButtonCss,
      colorOptionValueHeight,
      colorOptionValueBorderColor,
      colorOptionValueBorderWidth,
      optionValueFontSize,
      optionValueFontWeight,
      optionValueFontCasing,
      optionValueHeight,
      optionValueMinWidth,
      optionValueXPadding,
      optionValueBorderWidth,
      optionValueBorderRadius,
      optionValueBgColor,
      optionValueBorderColor,
      optionValueTextColor,
      optionValueUnavailBgColor,
      optionValueUnavailBorderColor,
      optionValueUnavailTextColor,
      optionValueUnavailStyle,
      optionValueUnavailStyleColor,
      inputBgColor,
      inputBorderColor,
      inputTextColor,
      inputTextFontWeight,
      inputHeight,
      inputXPadding,
      inputYPadding,
      inputBorderWidth,
      inputBorderRadius,
      inputLabelFontSize,
      inputLabelFontWeight,
      inputLabelFontCasing,
      baseInputCss,
      baseColorOptionValueCss,
      baseOptionValueCss,
    };
  }, [
    JSON.stringify(theme),
    buttonDefaults,
    colorsDefaults,
    disabledButtonColorDefaults,
    fontsDefaults,
    inverseDarkButtonColorDefaults,
    inverseLightButtonColorDefaults,
    primaryButtonColorDefaults,
    secondaryButtonColorDefaults,
  ]);
}
