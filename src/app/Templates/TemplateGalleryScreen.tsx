import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import TemplatePreview from '@components/TemplatePreview';
import { templateMetadata, templateRenderers } from '@templates/index';
import { selectActiveProfile, setTemplate } from '@store/profileSlice';
import { TemplateId } from '@types/cv';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const TemplateGalleryScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectActiveProfile);
  const [selected, setSelected] = React.useState<TemplateId>('atsClassic');
  const html = templateRenderers[selected](profile);

  const handleSelect = (id: TemplateId) => {
    setSelected(id);
    dispatch(setTemplate(id));
  };

  const exportPDF = async () => {
    const file = await RNHTMLtoPDF.convert({
      html,
      fileName: `cv-${profile.basic.fullName.replace(/\s+/g, '-')}`,
      base64: true
    });
    if (file.filePath && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(file.filePath, { mimeType: 'application/pdf' });
    }
  };

  const exportDocx = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ children: [new TextRun({ text: profile.basic.fullName, bold: true, size: 32 })] }),
            new Paragraph(profile.basic.summary)
          ]
        }
      ]
    });
    const blob = await Packer.toBase64String(doc);
    const fileUri = `${FileSystem.cacheDirectory}cv.docx`;
    await FileSystem.writeAsStringAsync(fileUri, blob, { encoding: FileSystem.EncodingType.Base64 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        {Object.entries(templateMetadata).map(([id, meta]) => (
          <Card
            key={id}
            style={[styles.card, selected === id ? styles.selected : null]}
            onPress={() => handleSelect(id as TemplateId)}
          >
            <Card.Title title={meta.title} subtitle={meta.description} />
          </Card>
        ))}
      </View>
      <TemplatePreview html={html} onExportPDF={exportPDF} onExportDocx={exportDocx} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  carousel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16
  },
  card: {
    flexBasis: '48%',
    borderRadius: 16
  },
  selected: {
    borderColor: '#1A73E8',
    borderWidth: 2
  }
});

export default TemplateGalleryScreen;
