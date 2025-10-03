import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { CVProfile, WorkItem } from '@types/cv';
import { RootState } from './store';

export interface ProfilesState {
  activeProfileId: string;
  profiles: Record<string, CVProfile>;
}

const createEmptyProfile = (): CVProfile => {
  const id = nanoid();
  const now = new Date().toISOString();
  return {
    id,
    basic: {
      fullName: '',
      title: '',
      summary: ''
    },
    work: [],
    education: [],
    projects: [],
    skills: {
      core: []
    },
    certifications: [],
    extras: {},
    createdAt: now,
    updatedAt: now
  };
};

const initialProfile = createEmptyProfile();

const initialState: ProfilesState = {
  activeProfileId: initialProfile.id,
  profiles: {
    [initialProfile.id]: initialProfile
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createNewProfile(state, action: PayloadAction<{ preset?: Partial<CVProfile> } | undefined>) {
      const profile = {
        ...createEmptyProfile(),
        ...action.payload?.preset
      };
      state.profiles[profile.id] = profile;
      state.activeProfileId = profile.id;
    },
    setActiveProfile(state, action: PayloadAction<string>) {
      if (state.profiles[action.payload]) {
        state.activeProfileId = action.payload;
      }
    },
    updateBasic(state, action: PayloadAction<Partial<CVProfile['basic']>>) {
      const profile = state.profiles[state.activeProfileId];
      profile.basic = { ...profile.basic, ...action.payload };
      profile.updatedAt = new Date().toISOString();
    },
    addWorkItem: {
      reducer(state, action: PayloadAction<WorkItem>) {
        const profile = state.profiles[state.activeProfileId];
        profile.work.push(action.payload);
        profile.updatedAt = new Date().toISOString();
      },
      prepare(work: Omit<WorkItem, 'id'>) {
        return { payload: { ...work, id: nanoid() } };
      }
    },
    updateWorkItem(state, action: PayloadAction<WorkItem>) {
      const profile = state.profiles[state.activeProfileId];
      profile.work = profile.work.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      profile.updatedAt = new Date().toISOString();
    },
    deleteWorkItem(state, action: PayloadAction<string>) {
      const profile = state.profiles[state.activeProfileId];
      profile.work = profile.work.filter((item) => item.id !== action.payload);
      profile.updatedAt = new Date().toISOString();
    },
    setTargetJD(state, action: PayloadAction<string | undefined>) {
      const profile = state.profiles[state.activeProfileId];
      profile.targetJD = action.payload;
      profile.updatedAt = new Date().toISOString();
    },
    updateSkills(state, action: PayloadAction<CVProfile['skills']>) {
      const profile = state.profiles[state.activeProfileId];
      profile.skills = action.payload;
      profile.updatedAt = new Date().toISOString();
    },
    setTemplate(state, action: PayloadAction<string>) {
      const profile = state.profiles[state.activeProfileId];
      profile.extras = { ...profile.extras, template: action.payload };
    }
  }
});

export const {
  createNewProfile,
  setActiveProfile,
  updateBasic,
  addWorkItem,
  updateWorkItem,
  deleteWorkItem,
  setTargetJD,
  updateSkills,
  setTemplate
} = profileSlice.actions;

export default profileSlice.reducer;

export const selectActiveProfile = (state: RootState) =>
  state.profile.profiles[state.profile.activeProfileId];

export const selectProfileCompletion = (state: RootState) => {
  const profile = selectActiveProfile(state);
  const filledSections = [
    profile.basic.fullName,
    profile.basic.summary,
    profile.work.length ? 'work' : '',
    profile.education.length ? 'education' : '',
    profile.skills.core.length ? 'skills' : ''
  ].filter(Boolean).length;
  return Math.round((filledSections / 5) * 100);
};

export const selectWorkItems = (state: RootState) => selectActiveProfile(state).work;
