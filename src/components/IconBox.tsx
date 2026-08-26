import { StyleSheet, Text, View } from 'react-native';

interface IconBoxProps {
  emoji: string;
  bg: string;
  size?: number;
  borderRadius?: number;
}

/** Coloured square holding a single emoji, used as a category/transaction icon. */
export const IconBox = ({ emoji, bg, size = 42, borderRadius = 12 }: IconBoxProps) => (
  <View style={[styles.iconBox, { width: size, height: size, borderRadius, backgroundColor: bg }]}>
    <Text style={{ fontSize: size * 0.43 }}>{emoji}</Text>
  </View>
);

const styles = StyleSheet.create({
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
