import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '@assets/fonts';
import { Button } from '@/components/Button';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { fontSize } from '@/utils/scale';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Catches render errors anywhere below it and offers a reset instead of a white screen. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, errorInfo.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.description}>
            The screen could not be displayed. Try again, or restart the app if it keeps happening.
          </Text>
          <Button label="Try again" onPress={this.handleReset} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bg,
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  description: {
    color: colors.muted,
    fontFamily: fonts.interRegular,
    fontSize: fontSize(13),
    lineHeight: 20,
    textAlign: 'center',
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interExtraBold,
    fontSize: fontSize(18),
  },
});
