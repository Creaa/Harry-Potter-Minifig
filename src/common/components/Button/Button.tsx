import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ onPress, title, disabled = false }) => {
  return (
    <View>
      <GestureHandlerRootView>
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          <View style={[buttonStyles.container, disabled && buttonStyles.disabled]}>
            <Text style={buttonStyles.text}>{title}</Text>
          </View>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

export default Button;

const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: '#008EEB',
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
