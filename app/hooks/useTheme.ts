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
import {navBarDefaults, promobarDefaults} from '~/settings/header';
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
  const {cart, header, theme} = useSettings();

  return useMemo(() => {
    /* Colors ---------- */
    const {
      bgColor = colorsDefaults.bgColor,
      textColor = colorsDefaults.textColor,
      borderColor = colorsDefaults.borderColor,
    } = {...theme?.colors};

    /* Fonts ---------- */
    const {
      headingFontFamily = fontsDefaults.headingFontFamily,
      headingFontWeight = fontsDefaults.headingFontWeight,
      headingFontCasing = fontsDefaults.headingFontCasing,
      headingTextAlignment = fontsDefaults.headingTextAlignment,
      bodyFontFamily = fontsDefaults.bodyFontFamily,
      bodyFontWeight = fontsDefaults.bodyFontWeight,
    } = {...theme?.fonts};

    /* Buttons ---------- */
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

    /* Product options ---------- */
    const colorOptionValueDefaults =
      productOptionValueDefaults.colorOptionValues;
    const optionValueDefaults = productOptionValueDefaults.optionValues;
    const {colorOptionValues, optionValues} = {...theme?.productOptionValues};
    const {
      height: colorOptionValueHeight = colorOptionValueDefaults.height,
      borderColor:
        colorOptionValueBorderColor = colorOptionValueDefaults.borderColor,
      selectedBorderColor:
        colorOptionValueSelectedBorderColor = colorOptionValueDefaults.selectedBorderColor,
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
      unavailTextColor:
        optionValueUnavailTextColor = optionValueDefaults.unavailTextColor,
      unavailBorderColor:
        optionValueUnavailBorderColor = optionValueDefaults.unavailBorderColor,
      selectedBorderColor:
        optionValueSelectedBorderColor = optionValueDefaults.selectedBorderColor,
      unavailStyle: optionValueUnavailStyle = optionValueDefaults.unavailStyle,
      unavailStyleColor:
        optionValueUnavailStyleColor = optionValueDefaults.unavailStyleColor,
    } = {...optionValues};

    /* Inputs ---------- */
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
      labelOffset: inputLabelOffset = inputDefaults.labelOffset,
    } = {...theme?.inputs};

    /* Header ---------- */
    const {
      heightDesktop: navDesktopHeight = navBarDefaults.heightDesktop,
      heightMobile: navMobileHeight = navBarDefaults.heightMobile,
      logoPercentHeight:
        navLogoPercentHeight = navBarDefaults.logoPercentHeight,
    } = {
      ...header?.nav,
    };
    const {
      sliderHeightDesktop:
        promobarDesktopSliderHeight = promobarDefaults.sliderHeightDesktop,
      paddingDesktop: promobarDesktopPadding = promobarDefaults.paddingDesktop,
      sliderHeightMobile:
        promobarMobileSliderHeight = promobarDefaults.sliderHeightMobile,
      paddingMobile: promobarMobilePadding = promobarDefaults.paddingMobile,
    } = {...header?.promobar};

    /* Cart ---------- */
    const {width: cartWidth = cart?.width || 384} = {...cart};

    return {
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
    };
  }, [
    cart,
    header,
    theme,
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
    navBarDefaults,
    promobarDefaults,
  ]);
}
