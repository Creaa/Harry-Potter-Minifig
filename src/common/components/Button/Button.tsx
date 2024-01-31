import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  variant?: 'submit' | 'warning' | 'danger';
}

const VARIANTS = {
  ['submit']: '#008EEB',
  ['warning']: '#f0ad4e',
  ['danger']: '#d9534f',
};

const Button: FC<ButtonProps> = ({ onPress, title, disabled = false, variant }) => {
  const styles = buttonStyles(variant);

  return (
    <View>
      <GestureHandlerRootView>
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          <View style={[styles.container, disabled && styles.disabled]}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

export default Button;

const buttonStyles = (variant: ButtonProps['variant']) =>
  StyleSheet.create({
    container: {
      backgroundColor: VARIANTS[variant || 'submit'],
      width: 223,
      height: 46,
      borderRadius: 61,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabled: {
      backgroundColor: '#CCCCCC',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });
