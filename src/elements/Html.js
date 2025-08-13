import React from 'react';
import RenderHtml from 'react-native-render-html';
import colors from '~configs/colors';
import themes from '~configs/themes';

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
