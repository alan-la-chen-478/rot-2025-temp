import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Text from '~elements/Text';
import Loading from '~elements/Loading';
import colors from '~configs/colors';

const MultiPressable = ({children, onMultiPress, multiPressTimes, ...props}) => {
  const [count, setCount] = useState(0);
  const [pressTimeout, setPressTimeoutOut] = useState(null);

  const onPress = () => {
    let newCount = count + 1;
    setCount(newCount);
    clearTimeout(pressTimeout);

    if (newCount == multiPressTimes) {
      setCount(0);
      return onMultiPress();
    }

    setPressTimeoutOut(setTimeout(() => setCount(0), 300));
  };

  return (
    <Pressable {...props} onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default MultiPressable;
