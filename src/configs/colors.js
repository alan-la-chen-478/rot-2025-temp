const colors = {
  white: '#fafafa',
  black: '#333333',
  grey: '#dedede',
  darkGrey: '#666666',
  lightGrey: '#dedede',
  red: '#cc3300',
  green: '#339900',
  yellow: '#ffcc00',
  orange: '#ff9966',
};

export const themed = {
  maintext: colors.black,
  border: colors.grey,
  error: colors.red,
  success: colors.green,
  warnning: colors.orange,
  primary: '#6a449a',
  secondary: '#856bba',
  lightSecondary: '#c4b0ec',
  headerBackground: '#c4b0ec',
};

export default {
  ...colors,
  ...themed,
};
