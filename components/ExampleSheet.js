import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { BackHandler, StyleSheet } from 'react-native';

const BackDrop = (props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} appearsOnIndex={0} />;

/**
 * @typedef {Object} SheetRef
 * @property {() => void} close
 * @property {() => void} present
 */

/**
 * @typedef {Object} Props
 * @property {SheetRef} ref
 * @property {() => void} onClose Additional code to run when sheet is closed.
 * @property {() => void} onChange Additional code to run when sheet is opened or closed.
 * @property {boolean} enableDynamicSizing
 */

/**
 * @type {React.FC<Props>}
 */
const ExampleSheet = forwardRef(({  onClose, children, onChange, ...rest }, ref) => {
  // position: -1 = closed, 0 = open
  const CLOSED_POSITION = -1;
  const positionRef = useRef(CLOSED_POSITION);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (positionRef.current === CLOSED_POSITION) {
        return false;
      }

      handleClose();
      return true;
    });

    return () => {
      listener.remove();
    };
  }, [handleClose, CLOSED_POSITION]);

  const handleClose = useCallback(() => {
    ref.current?.close();
    if (onClose) {
      onClose();
    }
  }, [onClose, ref]);


  const handleChange = useCallback(
    (position) => {
      positionRef.current = position;
      if (onChange) {
        onChange(position);
      }
    },
    [onChange]
  );

  return (
    <BottomSheetModal
      ref={ref}
      onClose={handleClose}
      onDismiss={handleClose}
      onChange={handleChange}
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      handleStyle={styles.handleContainer}
      handleHeight={18}
      backdropComponent={BackDrop}
      enableOverDrag={false}
      enableDynamicSizing={true}
      {...rest}>
      {children}
    </BottomSheetModal>
  );
});


const styles = StyleSheet.create({
  background: {
    color: '#FFFFFF',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#C5CACC',
    borderRadius: 20,
  },
  handleContainer: {
    paddingTop: 14,
    paddingBottom: 0,
  },
});

export default memo(ExampleSheet);
