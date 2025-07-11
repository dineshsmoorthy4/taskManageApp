import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTask } from '../../store/tasksSlice';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { DatePickerModal } from 'react-native-paper-dates';
import { format, parseISO } from 'date-fns';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('Due date is required'),
});

type EditTaskScreenRouteProp = RouteProp<MainStackParamList, 'EditTask'>;

const EditTaskScreen = ({
  route,
  navigation,
}: {
  route: EditTaskScreenRouteProp;
  navigation: any;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const { task } = route.params;

  const handleSubmit = (values: {
    title: string;
    description: string;
    dueDate: Date;
  }) => {
    const updatedTask = {
      ...task,
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toISOString(),
    };

    dispatch(updateTask(updatedTask));
    navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Formik
        initialValues={{
          title: task.title,
          description: task.description || '',
          dueDate: parseISO(task.dueDate),
        }}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            <TextInput
              label="Title"
              mode="outlined"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              error={touched.title && !!errors.title}
            />
            {touched.title && errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}

            <TextInput
              label="Description"
              mode="outlined"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <Button
              mode="outlined"
              onPress={() => setDatePickerOpen(true)}
              style={[styles.input, {borderColor: theme.colors.onBackground}]}
              icon="calendar"
            >
              {format(values.dueDate, 'PPP')}
            </Button>
            {touched.dueDate && errors.dueDate && (
              <Text style={styles.errorText}>
                {typeof errors.dueDate === 'string'
                  ? errors.dueDate
                  : 'Invalid date'}
              </Text>
            )}

            <DatePickerModal
              locale="en"
              mode="single"
              visible={datePickerOpen}
              onDismiss={() => setDatePickerOpen(false)}
              date={values.dueDate}
              onConfirm={({ date }) => {
                if (date) {
                  setFieldValue('dueDate', date);
                  setDatePickerOpen(false);
                }
              }}
            />

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              Update Task
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    marginTop: 14,
    borderRadius: 4,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditTaskScreen;
