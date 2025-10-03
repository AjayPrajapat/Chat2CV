import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

interface Props {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

const SectionCard: React.FC<Props> = ({ title, subtitle, onPress, onDelete, children }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View>
        <Text variant="titleMedium">{title}</Text>
        {subtitle ? <Text variant="bodyMedium">{subtitle}</Text> : null}
      </View>
      <View style={styles.actions}>
        {onDelete ? <IconButton icon="delete" onPress={onDelete} accessibilityLabel={`Delete ${title}`} /> : null}
        {onPress ? <IconButton icon="pencil" onPress={onPress} accessibilityLabel={`Edit ${title}`} /> : null}
      </View>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default SectionCard;
