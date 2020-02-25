import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const AnimatedContainer = (
  {shouldStart, children, containerStyle} = this.props,
) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: shouldStart ? 1 : 0,
      duration: 200,
    }).start();
  }, [shouldStart, animatedValue]);

  const interpolate = (x, y) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [x, y],
    });

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {scale: interpolate(0.98, 1)},
      {translateY: interpolate(0, -10)},
    ],
  };

  return (
    <Animated.View style={containerStyle(animatedStyle)}>
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
