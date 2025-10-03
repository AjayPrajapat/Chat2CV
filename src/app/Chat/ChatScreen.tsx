import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ChatBubble from '@components/ChatBubble';
import CompletionBar from '@components/CompletionBar';
import { pushMessage, setPendingSlot, completeSlot, SlotKey } from '@store/chatSlice';
import { addWorkItem, selectProfileCompletion, updateBasic } from '@store/profileSlice';
import { RootState } from '@store/store';
import { WorkItem } from '@types/cv';

interface SlotDefinition {
  key: SlotKey;
  question: string;
  onAnswer: (answer: string) => void;
}

const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const completion = useSelector(selectProfileCompletion);
  const pendingSlot = useSelector((state: RootState) => state.chat.pendingSlot);
  const completedSlots = useSelector((state: RootState) => state.chat.completedSlots);
  const [input, setInput] = React.useState('');

  const slotQueue = React.useMemo<SlotDefinition[]>(
    () => [
      {
        key: 'headline',
        question: 'What job title best describes you right now?',
        onAnswer: (answer) => dispatch(updateBasic({ title: answer }))
      },
      {
        key: 'summary',
        question: 'Give me a quick summary of your experience (2-3 sentences).',
        onAnswer: (answer) => dispatch(updateBasic({ summary: answer }))
      },
      {
        key: 'work',
        question: 'Tell me about your most recent role. Include company, role, and key achievement.',
        onAnswer: (answer) => {
          const workItem: Omit<WorkItem, 'id'> = {
            company: 'Recent Company',
            role: 'Role',
            startDate: new Date().toISOString().split('T')[0],
            achievements: [answer]
          };
          dispatch(addWorkItem(workItem));
        }
      }
    ],
    [dispatch]
  );

  const askNextQuestion = React.useCallback(() => {
    const nextSlot = slotQueue.find((slot) => !completedSlots.includes(slot.key));
    if (nextSlot) {
      dispatch(
        pushMessage({ role: 'assistant', content: nextSlot.question, slot: nextSlot.key })
      );
      dispatch(setPendingSlot(nextSlot.key));
    }
  }, [dispatch, slotQueue, completedSlots]);

  React.useEffect(() => {
    if (!pendingSlot) {
      askNextQuestion();
    }
  }, [askNextQuestion, pendingSlot]);

  const handleSend = () => {
    if (!input.trim()) return;
    const answer = input.trim();
    dispatch(pushMessage({ role: 'user', content: answer }));
    setInput('');
    if (pendingSlot) {
      const slot = slotQueue.find((item) => item.key === pendingSlot);
      slot?.onAnswer(answer);
      dispatch(completeSlot(pendingSlot));
    }
  };

  return (
    <View style={styles.container}>
      <CompletionBar value={completion} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatBubble role={item.role === 'assistant' ? 'assistant' : 'user'} content={item.content} />
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your answer"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
          Send
        </Button>
      </View>
      {pendingSlot ? (
        <Text style={styles.helper}>Answer the question above to progress your resume.</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  list: {
    paddingBottom: 80
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  input: {
    flex: 1
  },
  sendButton: {
    borderRadius: 16
  },
  helper: {
    textAlign: 'center',
    marginTop: 8,
    color: '#6C63FF'
  }
});

export default ChatScreen;
