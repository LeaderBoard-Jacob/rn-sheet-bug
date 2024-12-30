import React, { forwardRef } from 'react';
import ExampleSheet from './ExampleSheet';
import DateSheetItem from './DateSheetItem';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { FadeOut } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const DateSheet = forwardRef((_, ref) => {
  return (
    <ExampleSheet ref={ref}>
      <BottomSheetView style={styles.container}>
        <Animated.View exiting={FadeOut.duration(2000)}>
          <DateSheetItem
            enterDuration={200}
            enterDelay={150}
            title="1 Day Ago"
            value={1}
          />
          <DateSheetItem
            enterDuration={200}
            enterDelay={200}
            title="1 Week Ago"
            value={7}
          />
          <DateSheetItem
            enterDuration={200}
            enterDelay={250}
            title="1 Month Ago"
            value={30}
          />
          <DateSheetItem
            enterDuration={200}
            enterDelay={300}
            title="1 Year Ago"
            value={365}
          />
        </Animated.View>
      </BottomSheetView>
    </ExampleSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

export default DateSheet;
