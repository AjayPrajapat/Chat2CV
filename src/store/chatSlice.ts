import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type SlotKey =
  | 'headline'
  | 'summary'
  | 'work'
  | 'education'
  | 'skills'
  | 'projects'
  | 'achievements'
  | 'certifications'
  | 'links';

export interface ChatMessage {
  id: string;
  role: 'system' | 'assistant' | 'user';
  content: string;
  slot?: SlotKey;
}

interface ChatState {
  messages: ChatMessage[];
  pendingSlot?: SlotKey;
  completedSlots: SlotKey[];
}

const initialState: ChatState = {
  messages: [
    {
      id: nanoid(),
      role: 'assistant',
      content:
        'Hi! I\'m your Chat to CV assistant. I\'ll ask a few questions to assemble your resume. Ready when you are!'
    }
  ],
  completedSlots: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<Omit<ChatMessage, 'id'>>) {
      state.messages.push({ id: nanoid(), ...action.payload });
    },
    setPendingSlot(state, action: PayloadAction<SlotKey | undefined>) {
      state.pendingSlot = action.payload;
    },
    completeSlot(state, action: PayloadAction<SlotKey>) {
      if (!state.completedSlots.includes(action.payload)) {
        state.completedSlots.push(action.payload);
      }
      state.pendingSlot = undefined;
    },
    resetChat() {
      return initialState;
    }
  }
});

export const { pushMessage, setPendingSlot, completeSlot, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
