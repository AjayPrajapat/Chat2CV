import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { startAuth, authSuccess, authFailure } from '@store/authSlice';
import { login } from '@services/api';
import { AppDispatch } from '@store/store';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short')
});

type FormData = z.infer<typeof schema>;

const LoginScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (values: FormData) => {
    dispatch(startAuth());
    try {
      const response = await login(values.email, values.password);
      dispatch(authSuccess(response));
    } catch (error) {
      dispatch(authFailure((error as Error).message));
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Welcome back
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            error={!!formState.errors.email}
          />
        )}
      />
      {formState.errors.email && <Text style={styles.error}>{formState.errors.email.message}</Text>}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
            error={!!formState.errors.password}
          />
        )}
      />
      {formState.errors.password && (
        <Text style={styles.error}>{formState.errors.password.message}</Text>
      )}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('ForgotPassword' as never)}>
        Forgot Password?
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Signup' as never)}>
        Create account
      </Button>
      {formState.isSubmitting && <Text>Signing in…</Text>}
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

export default LoginScreen;
