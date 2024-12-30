import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import CheckMark from './Checkmark';

const DateSheetItem = ({
  title,
  value,
  onPress,
  selected,
  containerStyle,
  disabled,
  description,
  enterDuration = 0,
  enterDelay = 0,
  exitDuration = 0,
  exitDelay = 0,
}) => {
  const handlePress = () => {
    onPress(value, title);
  };
  return (
    <Animated.View
      exiting={FadeOut.duration(exitDuration).delay(exitDelay)}
      entering={FadeIn.duration(enterDuration).delay(enterDelay)}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.65}
        style={[styles.container, selected && styles.selected, containerStyle, disabled && styles.disabled]}>
        <View style={styles.header}>
          <Text style={styles.text}>{title}</Text>
            <Animated.View exiting={FadeOut.duration(200)} entering={BounceIn.duration(200)}>
              <CheckMark />
            </Animated.View>
        </View>
        {description ? (
          <Text allowFontScaling={false} style={styles.description}>
            {description}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C5CACC',
    borderRadius: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingTop: 8,
    fontSize: 12,
    color: '#5F6A6A',
  },
  selected: {
    borderColor: '#00CD93',
    shadowOpacity: 0.14,
    shadowRadius: 7,
    shadowOffset: {
      height: 0,
    },
    elevation: 3,
    shadowColor: '#00CD93',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#5F6A6A',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default DateSheetItem;
