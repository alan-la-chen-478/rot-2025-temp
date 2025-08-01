import React from 'react';
import RenderHtml from 'react-native-render-html';
import themes from '~configs/themes';
import colors from '~configs/colors';

const Html = ({evaluator, baseStyle, ...props}) => {
  if (evaluator && evaluator.length == 0) {
    return null;
  }

  return (
    <RenderHtml
      {...props}
      contentWidth={500}
      systemFonts={[themes.baseFontFamily]}
      baseStyle={{
        fontFamily: themes.baseFontFamily,
        color: colors.maintext,
        fontSize: 16,
        ...baseStyle,
      }}
    />
  );
};

export default Html;
