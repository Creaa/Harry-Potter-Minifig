import React, { FC } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

interface SectionContainerProps {
  children: JSX.Element;
  title: string;
}

const SectionContainer: FC<SectionContainerProps> = ({ children, title }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#1F2236',
    color: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontFamily: 'ChangaOne_400Regular',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50,
  },
  container: {
    width: '100%',
    paddingTop: 50,
    overflow: 'scroll',
  },
});

export default SectionContainer;
