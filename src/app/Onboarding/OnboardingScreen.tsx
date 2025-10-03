import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Chip, Text, ToggleButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTheme, setLanguage } from '@store/uiSlice';

const goals = [
  { id: 'ats', label: 'ATS Optimized' },
  { id: 'design', label: 'Beautiful Design' },
  { id: 'both', label: 'Both' }
];

const OnboardingScreen = () => {
  const [selectedGoal, setSelectedGoal] = React.useState('ats');
  const [selectedTheme, setSelectedTheme] = React.useState<'light' | 'dark'>('light');
  const [selectedLanguage, setSelectedLanguage] = React.useState<'en' | 'hi'>('en');
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch(setTheme(selectedTheme));
    dispatch(setLanguage(selectedLanguage));
    // TODO: Save onboarding completion to persisted state
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome! Let’s personalize Chat to CV.
      </Text>
      <Text style={styles.subtitle}>Choose your main goal:</Text>
      <View style={styles.row}>
        {goals.map((goal) => (
          <Chip
            key={goal.id}
            selected={selectedGoal === goal.id}
            onPress={() => setSelectedGoal(goal.id)}
            style={styles.chip}
          >
            {goal.label}
          </Chip>
        ))}
      </View>
      <Text style={styles.subtitle}>Theme preference</Text>
      <ToggleButton.Row
        onValueChange={(value) => setSelectedTheme(value as 'light' | 'dark')}
        value={selectedTheme}
      >
        <ToggleButton icon="weather-sunny" value="light" />
        <ToggleButton icon="weather-night" value="dark" />
      </ToggleButton.Row>
      <Text style={styles.subtitle}>Language</Text>
      <ToggleButton.Row
        onValueChange={(value) => setSelectedLanguage(value as 'en' | 'hi')}
        value={selectedLanguage}
      >
        <ToggleButton icon="translate" value="en">
          EN
        </ToggleButton>
        <ToggleButton icon="translate" value="hi">
          HI
        </ToggleButton>
      </ToggleButton.Row>
      <Button mode="contained" style={styles.button} onPress={onContinue}>
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    marginBottom: 24,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    marginRight: 8,
    marginBottom: 8
  },
  button: {
    marginTop: 24,
    borderRadius: 16
  }
});

export default OnboardingScreen;
