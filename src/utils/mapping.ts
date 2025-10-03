import { CVProfile } from '@types/cv';

export const mapParsedProfile = (response: { profile?: Partial<CVProfile> }): Partial<CVProfile> => {
  // TODO: perform robust mapping once backend schema is final
  return {
    ...response.profile,
    updatedAt: new Date().toISOString(),
    createdAt: response.profile?.createdAt ?? new Date().toISOString()
  } as Partial<CVProfile>;
};
