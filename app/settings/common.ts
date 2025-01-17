export const COLOR_PICKER_DEFAULTS = [
  /* Add/edit additional suggested colors for the color picker here */
  '#FFFFFF',
  '#F5F5F5',
  '#C0C0C0',
  '#808080',
  '#000000',
  '#FFA500',
  '#FF0000',
  '#800000',
  '#FFFF00',
  '#808000',
  '#008000',
  '#7FFFD4',
  '#ADD8E6',
  '#008080',
  '#0000FF',
  '#00008B',
  '#FF00FF',
  '#FFC0CB',
  '#800080',
];

/* Fonts */

export const FONT_FAMILIES = [
  {label: 'Roboto', value: 'Roboto'},
  {label: 'Poppins', value: 'Poppins'},
  {label: 'Inter', value: 'Inter'},
  {label: 'Open Sans', value: 'Open Sans'},
  {label: 'Montserrat', value: 'Montserrat'},
  {label: 'Oswald', value: 'Oswald'},
  {label: 'Noto Sans', value: 'Noto Sans'},
  {label: 'Raleway', value: 'Raleway'},
  {label: 'Roboto Slab', value: 'Roboto Slab'},
  {label: 'Roboto Serif', value: 'Roboto Serif'},
  {label: 'Merriweather', value: 'Merriweather'},
  {label: 'Playfair Display', value: 'Playfair Display'},
];

export const FONT_WEIGHTS = [
  {label: 'Light', value: '300'},
  {label: 'Regular', value: '400'},
  {label: 'Medium', value: '500'},
  {label: 'Semi Bold', value: '600'},
  {label: 'Bold', value: '700'},
];

export const FONT_CASINGS = [
  {label: 'Normal', value: 'none'},
  {label: 'Uppercase', value: 'uppercase'},
];

/* Text */

export const TEXT_ALIGN = {
  mobile: [
    {label: 'Left', value: 'text-left'},
    {label: 'Center', value: 'text-center'},
    {label: 'Right', value: 'text-right'},
  ],
  desktop: [
    {label: 'Left', value: 'md:text-left'},
    {label: 'Center', value: 'md:text-center'},
    {label: 'Right', value: 'md:text-right'},
  ],
};

export const HEADING_SIZES = [
  {label: 'H1', value: 'text-h1'},
  {label: 'H2', value: 'text-h2'},
  {label: 'H3', value: 'text-h3'},
  {label: 'H4', value: 'text-h4'},
  {label: 'H5', value: 'text-h5'},
  {label: 'H6', value: 'text-h6'},
];

/* Buttons */

export const BUTTONS = [
  {label: 'Primary', value: 'theme-btn-primary'},
  {label: 'Secondary', value: 'theme-btn-secondary'},
  {label: 'Inverse Light', value: 'theme-btn-inverse-light'},
  {label: 'Inverse Dark', value: 'theme-btn-inverse-dark'},
];

/* Positions and alignments */

export const FLEX_POSITIONS = {
  mobile: [
    {
      value: 'justify-start items-start',
      label: 'Left Top',
    },
    {
      value: 'justify-start items-center',
      label: 'Left Center',
    },
    {
      value: 'justify-start items-end',
      label: 'Left Bottom',
    },
    {
      value: 'justify-center items-start',
      label: 'Center Top',
    },
    {
      value: 'justify-center items-center',
      label: 'Center Center',
    },
    {
      value: 'justify-center items-end',
      label: 'Center Bottom',
    },
    {
      value: 'justify-end items-start',
      label: 'Right Top',
    },
    {
      value: 'justify-end items-center',
      label: 'Right Center',
    },
    {
      value: 'justify-end items-end',
      label: 'Right Bottom',
    },
  ],
  desktop: [
    {
      value: 'md:justify-start md:items-start',
      label: 'Left Top',
    },
    {
      value: 'md:justify-start md:items-center',
      label: 'Left Center',
    },
    {
      value: 'md:justify-start md:items-end',
      label: 'Left Bottom',
    },
    {
      value: 'md:justify-center md:items-start',
      label: 'Center Top',
    },
    {
      value: 'md:justify-center md:items-center',
      label: 'Center Center',
    },
    {
      value: 'md:justify-center md:items-end',
      label: 'Center Bottom',
    },
    {
      value: 'md:justify-end md:items-start',
      label: 'Right Top',
    },
    {
      value: 'md:justify-end md:items-center',
      label: 'Right Center',
    },
    {
      value: 'md:justify-end md:items-end',
      label: 'Right Bottom',
    },
  ],
};

export const OBJECT_POSITIONS = {
  mobile: [
    {
      value: 'object-left-top',
      label: 'Left Top',
    },
    {
      value: 'object-left',
      label: 'Left Center',
    },
    {
      value: 'object-left-bottom',
      label: 'Left Bottom',
    },
    {
      value: 'object-top',
      label: 'Center Top',
    },
    {
      value: 'object-center',
      label: 'Center Center',
    },
    {
      value: 'object-bottom',
      label: 'Center Bottom',
    },
    {
      value: 'object-right-top',
      label: 'Right Top',
    },
    {
      value: 'object-right',
      label: 'Right Center',
    },
    {
      value: 'object-right-bottom',
      label: 'Right Bottom',
    },
  ],
  desktop: [
    {
      value: 'md:object-left-top',
      label: 'Left Top',
    },
    {
      value: 'md:object-left',
      label: 'Left Center',
    },
    {
      value: 'md:object-left-bottom',
      label: 'Left Bottom',
    },
    {
      value: 'md:object-top',
      label: 'Center Top',
    },
    {
      value: 'md:object-center',
      label: 'Center Center',
    },
    {
      value: 'md:object-bottom',
      label: 'Center Bottom',
    },
    {
      value: 'md:object-right-top',
      label: 'Right Top',
    },
    {
      value: 'md:object-right',
      label: 'Right Center',
    },
    {
      value: 'md:object-right-bottom',
      label: 'Right Bottom',
    },
  ],
};

export const CROP_POSITIONS = [
  {value: 'center', label: 'Center'},
  {value: 'top', label: 'Top'},
  {value: 'bottom', label: 'Bottom'},
  {value: 'left', label: 'Left'},
  {value: 'right', label: 'Right'},
];

export const CONTENT_ALIGN = {
  mobile: [
    {label: 'Left', value: 'text-left items-start'},
    {label: 'Center', value: 'text-center items-center'},
    {label: 'Right', value: 'text-right items-end'},
  ],
  desktop: [
    {label: 'Left', value: 'md:text-left md:items-start'},
    {label: 'Center', value: 'md:text-center md:items-center'},
    {label: 'Right', value: 'md:text-right md:items-end'},
  ],
};
