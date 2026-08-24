import { HelperText, TextInput, type TextInputProps } from 'react-native-paper';

import { ACCESSIBILITY } from '@shared/constants/accessibility';

export interface AppTextInputProps extends Omit<TextInputProps, 'theme'> {
  description?: string;
  errorText?: string | undefined;
}

export const AppTextInput = ({
  description,
  errorText,
  mode = 'outlined',
  ...props
}: AppTextInputProps) => (
  <>
    <TextInput
      error={Boolean(errorText)}
      maxFontSizeMultiplier={ACCESSIBILITY.maxFontSizeMultiplier}
      mode={mode}
      {...props}
    />
    {errorText ? (
      <HelperText
        maxFontSizeMultiplier={ACCESSIBILITY.maxFontSizeMultiplier}
        type="error"
        visible
      >
        {errorText}
      </HelperText>
    ) : description ? (
      <HelperText
        maxFontSizeMultiplier={ACCESSIBILITY.maxFontSizeMultiplier}
        type="info"
        visible
      >
        {description}
      </HelperText>
    ) : null}
  </>
);
