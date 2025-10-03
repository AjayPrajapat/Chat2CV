import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  role: 'assistant' | 'user';
  content: string;
}

const ChatBubble: React.FC<Props> = ({ role, content }) => (
  <View
    style={[styles.container, role === 'user' ? styles.user : styles.assistant]}
    accessibilityRole="text"
  >
    <Text style={styles.text}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '80%'
  },
  assistant: {
    backgroundColor: '#E0ECFF',
    alignSelf: 'flex-start'
  },
  user: {
    backgroundColor: '#1A73E8',
    alignSelf: 'flex-end'
  },
  text: {
    color: '#1F2937'
  }
});

export default ChatBubble;
