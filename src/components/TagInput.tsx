import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, TextInput } from 'react-native-paper';

interface Props {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<Props> = ({ values, onChange, placeholder }) => {
  const [input, setInput] = React.useState('');

  const addTag = () => {
    if (!input.trim()) return;
    onChange([...values, input.trim()]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tags}>
        {values.map((tag, index) => (
          <Chip key={tag + index} onClose={() => removeTag(index)} style={styles.chip}>
            {tag}
          </Chip>
        ))}
      </View>
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addTag}
        placeholder={placeholder}
        style={styles.input}
        right={<TextInput.Icon icon="plus" onPress={addTag} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  chip: {
    marginRight: 8,
    marginBottom: 8
  },
  input: {
    borderRadius: 16
  }
});

export default TagInput;
