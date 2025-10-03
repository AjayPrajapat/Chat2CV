import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestPasswordReset } from '@services/api';

const schema = z.object({ email: z.string().email() });

type FormData = z.infer<typeof schema>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (values: FormData) => {
    await requestPasswordReset(values.email);
    setSuccess(true);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Reset Password
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
          />
        )}
      />
      {formState.errors.email && <Text style={styles.error}>{formState.errors.email.message}</Text>}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Send reset link
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()}>
        Back
      </Button>
      {success && <Text style={styles.success}>Check your inbox for reset instructions.</Text>}
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
  },
  success: {
    marginTop: 12,
    color: '#1A73E8'
  }
});

export default ForgotPasswordScreen;
