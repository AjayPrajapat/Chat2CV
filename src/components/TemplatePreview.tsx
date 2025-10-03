import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';

interface Props {
  html: string;
  onExportPDF?: () => void;
  onExportDocx?: () => void;
}

const TemplatePreview: React.FC<Props> = ({ html, onExportPDF, onExportDocx }) => (
  <View style={styles.container}>
    <WebView originWhitelist={["*"]} source={{ html }} style={styles.webview} />
    <View style={styles.actions}>
      <Button mode="contained" onPress={onExportPDF} style={styles.button}>
        Export PDF
      </Button>
      <Button mode="outlined" onPress={onExportDocx} style={styles.button}>
        Export DOCX
      </Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12
  },
  button: {
    borderRadius: 16,
    minWidth: 140
  }
});

export default TemplatePreview;
