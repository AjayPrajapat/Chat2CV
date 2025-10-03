import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Portal, Modal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SectionCard from '@components/SectionCard';
import ResumeSectionForm, { WorkFormValues } from '@components/ResumeSectionForm';
import TagInput from '@components/TagInput';
import {
  selectActiveProfile,
  selectWorkItems,
  addWorkItem,
  updateWorkItem,
  deleteWorkItem,
  updateBasic,
  updateSkills
} from '@store/profileSlice';

const EditorScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectActiveProfile);
  const workItems = useSelector(selectWorkItems);
  const [visible, setVisible] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | undefined>(undefined);

  const onSubmit = (values: WorkFormValues) => {
    if (editingId) {
      dispatch(updateWorkItem({ id: editingId, ...values }));
    } else {
      dispatch(addWorkItem(values));
    }
    setVisible(false);
    setEditingId(undefined);
  };

  const openEditor = (id?: string) => {
    setEditingId(id);
    setVisible(true);
  };

  const closeEditor = () => {
    setVisible(false);
    setEditingId(undefined);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Basic information" subtitle="Your headline details">
          <Text>{profile.basic.fullName || 'Add your full name'}</Text>
          <Text>{profile.basic.title || 'Add your title'}</Text>
          <Button onPress={() => dispatch(updateBasic({ fullName: 'Jane Doe' }))}>Quick fill name</Button>
        </SectionCard>
        <SectionCard title="Skills" subtitle="Highlight what you do best">
          <TagInput
            values={profile.skills.core}
            onChange={(values) => dispatch(updateSkills({ ...profile.skills, core: values }))}
            placeholder="Add skill"
          />
        </SectionCard>
        <SectionCard
          title="Work Experience"
          subtitle="Recent positions"
          onPress={() => openEditor()}
        >
          {workItems.map((item) => (
            <SectionCard
              key={item.id}
              title={`${item.role} @ ${item.company}`}
              subtitle={`${item.startDate} - ${item.endDate ?? 'Present'}`}
              onPress={() => openEditor(item.id)}
              onDelete={() => dispatch(deleteWorkItem(item.id))}
            >
              {item.achievements.map((achievement) => (
                <Text key={achievement} style={styles.bullet}>
                  • {achievement}
                </Text>
              ))}
            </SectionCard>
          ))}
          <Button mode="outlined" onPress={() => openEditor()} style={styles.addButton}>
            Add role
          </Button>
        </SectionCard>
      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={closeEditor} contentContainerStyle={styles.modal}>
          <ResumeSectionForm
            defaultValues={workItems.find((item) => item.id === editingId)}
            onSubmit={onSubmit}
            onCancel={closeEditor}
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  addButton: {
    marginTop: 12,
    borderRadius: 16
  },
  modal: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    maxHeight: '90%'
  },
  bullet: {
    marginVertical: 4
  }
});

export default EditorScreen;
