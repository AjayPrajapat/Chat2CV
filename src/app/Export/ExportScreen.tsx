import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectActiveProfile } from '@store/profileSlice';
import { templateRenderers } from '@templates/index';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Document, Packer, Paragraph } from 'docx';

const ExportScreen = () => {
  const profile = useSelector(selectActiveProfile);
  const templateId = (profile.extras?.template as keyof typeof templateRenderers) ?? 'atsClassic';
  const html = templateRenderers[templateId](profile);

  const exportPDF = async () => {
    const file = await RNHTMLtoPDF.convert({ html, fileName: `${profile.basic.fullName}-cv`, base64: true });
    if (file.filePath && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(file.filePath, { mimeType: 'application/pdf' });
    }
  };

  const exportDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(profile.basic.fullName), new Paragraph(profile.basic.summary)]
        }
      ]
    });
    const base64 = await Packer.toBase64String(doc);
    const fileUri = `${FileSystem.cacheDirectory}cv-export.docx`;
    await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Export & Share
      </Text>
      <Button mode="contained" style={styles.button} onPress={exportPDF}>
        Export PDF
      </Button>
      <Button mode="outlined" style={styles.button} onPress={exportDocx}>
        Export DOCX
      </Button>
      <Text style={styles.caption}>Versions are stored locally. Coming soon: cloud sync.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 24
  },
  button: {
    marginVertical: 12,
    borderRadius: 16
  },
  caption: {
    textAlign: 'center',
    marginTop: 12
  }
});

export default ExportScreen;
