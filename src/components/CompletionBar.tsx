import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';

interface Props {
  value: number;
}

const CompletionBar: React.FC<Props> = ({ value }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text variant="titleSmall">Profile completeness</Text>
      <Text>{value}%</Text>
    </View>
    <ProgressBar progress={value / 100} color="#1A73E8" style={styles.bar} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(26,115,232,0.08)',
    marginVertical: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  bar: {
    height: 8,
    borderRadius: 4
  }
});

export default CompletionBar;
