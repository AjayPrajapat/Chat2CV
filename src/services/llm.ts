import { DocumentPickerAsset } from 'expo-document-picker';
import { api } from './api';

export interface ParsedProfileResponse {
  profile: Record<string, unknown>;
}

export const parseResumeFile = async (asset: DocumentPickerAsset) => {
  // TODO: upload file using multipart/form-data
  const form = new FormData();
  form.append('file', {
    uri: asset.uri,
    name: asset.name ?? 'resume.pdf',
    type: asset.mimeType ?? 'application/pdf'
  } as any);
  const { data } = await api.post('/llm/extract', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data as ParsedProfileResponse;
};

export const improveProfile = async (profileId: string, targetJD: string) => {
  const { data } = await api.post('/llm/improve', { profileId, targetJD });
  return data;
};
