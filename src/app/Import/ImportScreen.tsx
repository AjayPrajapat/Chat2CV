import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { mapParsedProfile } from '@utils/mapping';
import { parseResumeFile } from '@services/llm';
import { createNewProfile } from '@store/profileSlice';

const ImportScreen = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState<string>('');

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    });
    if (result.canceled) return;
    setStatus('Uploading resume for parsing…');
    try {
      const parsed = await parseResumeFile(result.assets[0]);
      const profile = mapParsedProfile(parsed);
      dispatch(createNewProfile({ preset: profile }));
      setStatus('Resume imported! Review in the editor.');
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Import existing resume
      </Text>
      <Text style={styles.subtitle}>Upload PDF or DOCX to extract your experience.</Text>
      <Button mode="contained" onPress={pickFile} style={styles.button}>
        Choose file
      </Button>
      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  title: {
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24
  },
  button: {
    borderRadius: 16,
    marginHorizontal: 32
  },
  status: {
    marginTop: 16,
    textAlign: 'center'
  }
});

export default ImportScreen;
