import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { startAuth, authSuccess, authFailure } from '@store/authSlice';
import { signup } from '@services/api';
import { AppDispatch } from '@store/store';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof schema>;

const SignupScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: FormData) => {
    dispatch(startAuth());
    try {
      const response = await signup(values.name, values.email, values.password);
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure((error as Error).message));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Join Chat to CV
      </Text>
      {(['name', 'email', 'password', 'confirmPassword'] as const).map((field) => (
        <Controller
          key={field}
          control={control}
          name={field}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              value={value}
              onChangeText={onChange}
              secureTextEntry={field.includes('password')}
              style={styles.input}
              autoCapitalize={field === 'email' ? 'none' : 'sentences'}
            />
          )}
        />
      ))}
      {Object.values(formState.errors).map((err) => (
        <Text key={err.message} style={styles.error}>
          {err.message}
        </Text>
      ))}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Create Account
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()}>
        Back to login
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
  input: {
    marginBottom: 12
  },
  button: {
    marginTop: 8,
    borderRadius: 16
  },
  error: {
    color: '#D14343',
    marginBottom: 8
  }
});

export default SignupScreen;
