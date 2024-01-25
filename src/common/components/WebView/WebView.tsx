import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { default as ReactNativeWeView } from 'react-native-webview';

interface WebviewProps {
  url: string;
  onCloseHandler: () => void;
}

const Webview: React.FC<WebviewProps> = ({ url, onCloseHandler }) => {
  return (
    <View style={webViewStyles.container}>
      <View style={webViewStyles.header}>
        <Text onPress={onCloseHandler} style={webViewStyles.closeButton}>
          X
        </Text>
      </View>
      <ReactNativeWeView
        source={{
          uri: url,
        }}
        style={webViewStyles.webViewContainer}
      />
    </View>
  );
};

export default Webview;

const webViewStyles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  closeButton: {
    fontSize: 20,
    color: '#fff',
    padding: 13,
    width: 30,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E1E',
  },
  webViewContainer: {
    width: '100%',
    backgroundColor: '#1F2236',
  },
});
