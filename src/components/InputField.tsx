import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { colors } from '../theme/Colors';
import { View, StyleProp, ViewStyle, KeyboardTypeOptions, TextStyle } from 'react-native';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  error?: string;
  leftIcon?: string;
  onLeftIconPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
  onSubmitEditing?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  outlineColor?: string;
  placeholderColor?: string;
  roundness?: number;
  leftIconColor?: string;
  rightIconColor?: string;
  leftIconsaxIcon?: React.ReactNode;
  rightIconsaxIcon?: React.ReactNode;
}

export interface InputFieldRef {
  focus: () => void;
}

const InputField: React.ForwardRefRenderFunction<
  InputFieldRef,
  InputFieldProps
> = (
  {
    label,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
    error,
    leftIcon,
    onLeftIconPress,
    rightIcon,
    onRightIconPress,
    onSubmitEditing,
    containerStyle,
    outlineColor,
    placeholderColor,
    roundness,
    leftIconColor,
    rightIconColor,
    rightIconsaxIcon,
    leftIconsaxIcon,
    inputStyle
  },
  ref: Ref<InputFieldRef>,
) => {
    const textInputRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      },
    }));

    return (
      <View style={containerStyle}>
        <TextInput
          ref={textInputRef}
          autoCapitalize='none'
          label={label}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          mode="outlined"
          style={inputStyle}
          outlineColor={outlineColor}
          theme={{
            colors: {
              primary: colors.primary,
              background: colors.white,
              onSurfaceVariant: placeholderColor
            },
            roundness: roundness
          }}
          textColor={colors.black}
          left={
            leftIcon || leftIconsaxIcon ? (
              <TextInput.Icon onPress={onLeftIconPress} icon={
                leftIconsaxIcon ? () =>
                  <View >
                    {leftIconsaxIcon}
                  </View>
                  : leftIcon as IconSource
              }
                color={leftIconColor} />
            ) : null
          }
          right={
            rightIcon || rightIconsaxIcon ? (
              <TextInput.Icon onPress={onRightIconPress} icon={
                rightIconsaxIcon ? () =>
                  <View >
                    {rightIconsaxIcon}
                  </View>
                  : rightIcon as IconSource
              }
                color={rightIconColor} />
            ) : null
          }
          onSubmitEditing={onSubmitEditing}
        />
        {error && <HelperText type="error">{error}</HelperText>}
      </View>
    );
  };

export default forwardRef<InputFieldRef, InputFieldProps>(InputField);
