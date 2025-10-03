import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkItem } from '@types/cv';

const schema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().optional(),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
  achievements: z.array(z.string().min(5, 'Describe the achievement')).min(1),
  techStack: z.array(z.string()).optional()
});

export type WorkFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<WorkItem>;
  onSubmit: (values: WorkFormValues) => void;
  onCancel: () => void;
}

const ResumeSectionForm: React.FC<Props> = ({ defaultValues, onSubmit, onCancel }) => {
  const { control, handleSubmit } = useForm<WorkFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: defaultValues?.company ?? '',
      role: defaultValues?.role ?? '',
      location: defaultValues?.location ?? '',
      startDate: defaultValues?.startDate ?? '',
      endDate: defaultValues?.endDate ?? '',
      achievements: defaultValues?.achievements ?? [''],
      techStack: defaultValues?.techStack ?? []
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'achievements' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(['company', 'role', 'location', 'startDate', 'endDate'] as const).map((field) => (
        <Controller
          key={field}
          control={control}
          name={field}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
        />
      ))}
      <View style={styles.sectionHeader}>
        <Button onPress={() => append('')} icon="plus">
          Add achievement
        </Button>
      </View>
      {fields.map((item, index) => (
        <Controller
          key={item.id}
          control={control}
          name={`achievements.${index}` as const}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={`Achievement ${index + 1}`}
              value={value}
              onChangeText={onChange}
              multiline
              style={styles.input}
              right={<TextInput.Icon icon="delete" onPress={() => remove(index)} />}
            />
          )}
        />
      ))}
      <Button mode="contained" style={styles.button} onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
      <Button mode="text" onPress={onCancel}>
        Cancel
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 12
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 4
  },
  button: {
    borderRadius: 16,
    marginVertical: 12
  }
});

export default ResumeSectionForm;
