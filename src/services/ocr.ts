import { api } from './api';

export const uploadResumeImage = async (base64: string) => {
  const { data } = await api.post('/ocr/image', { image: base64 });
  return data;
};
