import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, List, Text, Switch, SegmentedButtons } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { RootState } from '@store/store';
import { setLanguage, setTheme } from '@store/uiSlice';
import { selectProfileCompletion } from '@store/profileSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const language = useSelector((state: RootState) => state.ui.language);
  const completion = useSelector(selectProfileCompletion);
  const chartWidth = Dimensions.get('window').width - 48;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark mode"
          right={() => (
            <Switch
              value={theme === 'dark'}
              onValueChange={(value) => dispatch(setTheme(value ? 'dark' : 'light'))}
            />
          )}
        />
        <List.Item
          title="Use system"
          right={() => (
            <Switch value={theme === 'system'} onValueChange={() => dispatch(setTheme('system'))} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Language</List.Subheader>
        <SegmentedButtons
          value={language}
          onValueChange={(value) => dispatch(setLanguage(value as 'en' | 'hi'))}
          buttons={[
            { value: 'en', label: 'English' },
            { value: 'hi', label: 'हिन्दी' }
          ]}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Analytics</List.Subheader>
        <View style={styles.card}>
          <Text>Profile completeness: {completion}%</Text>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{ data: [30, 45, completion, completion + 5, completion + 10] }]
            }}
            width={chartWidth}
            height={160}
            withInnerLines={false}
            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 115, 232, ${opacity})`,
              labelColor: () => '#6B7280'
            }}
            style={styles.chart}
          />
        </View>
      </List.Section>
      <Button mode="outlined" style={styles.button}>
        Export data
      </Button>
      <Button mode="contained" style={styles.button} buttonColor="#D14343">
        Delete account
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F3F4F6'
  },
  button: {
    borderRadius: 16,
    marginVertical: 8
  },
  chart: {
    marginTop: 12,
    borderRadius: 16
  }
});

export default SettingsScreen;
