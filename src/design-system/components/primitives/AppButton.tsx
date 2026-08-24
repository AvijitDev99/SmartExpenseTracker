import { StyleSheet } from 'react-native';
import { Button, type ButtonProps } from 'react-native-paper';

import { ACCESSIBILITY } from '@shared/constants/accessibility';

export const AppButton = ({
  children,
  contentStyle,
  mode = 'contained',
  ...props
}: ButtonProps) => (
  <Button
    contentStyle={[styles.content, contentStyle]}
    mode={mode}
    {...props}
  >
    {children}
  </Button>
);

const styles = StyleSheet.create({
  content: {
    minHeight: ACCESSIBILITY.minTouchTargetSize,
  },
});
