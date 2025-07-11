import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native';
import { Appbar, List, Button, useTheme, FAB } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, setTasks } from '../../store/tasksSlice';
import { Task } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  EditTask: { task: Task };
};

type TaskListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskList'
>;

interface TaskListScreenProps {
  navigation: TaskListScreenNavigationProp;
}

const TaskListScreen = ({ navigation }: TaskListScreenProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: any) => state.tasks.tasks);

  const sortedTasks = React.useMemo(
    () =>
      [...tasks].sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
      ),
    [tasks],
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          dispatch(setTasks(JSON.parse(storedTasks)));
        }
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    };

    loadTasks();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => dispatch(deleteTask(id)) },
    ]);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <List.Item
      title={item.title}
      description={
        <View>
          <>
            <Text numberOfLines={2} style={[styles.descriptionText, { color: theme.colors.onBackground }]}>
              {item.description}
            </Text>
          </>
          <>
            <Text style={[styles.dueDateText, { color: theme.colors.onBackground }]}>
              {new Date(item.dueDate).toLocaleString()}
            </Text>
          </>
        </View>
      }
      descriptionNumberOfLines={3}
      right={() => (
        <View style={styles.rightActionsContainer}>
          <View style={styles.buttonsContainer}>
            <Button
              icon="pencil"
              onPress={() => navigation.navigate('EditTask', { task: item })}
              style={styles.button}
              compact
              children={undefined}
            ></Button>
            <Button
              icon="delete"
              onPress={() => handleDelete(item.id)}
              color={theme.colors.onBackground}
              style={styles.button}
              compact
              children={undefined}
            ></Button>
          </View>
        </View>
      )}
      style={[styles.listItem, {borderColor: theme.colors.onBackground}]}
    />
  );

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* <Appbar.Header>
        <Appbar.Content title="Tasks" />
        <Appbar.Action icon="logout" onPress={() => dispatch(logout())} />
      </Appbar.Header> */}

        <FlatList
          data={sortedTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />

        <FAB
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          icon="plus"
          onPress={() => navigation.navigate('AddTask')}
          color={theme.colors.onPrimary}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
    paddingBottom: 80,
    marginTop: 10,
  },
  listItem: {
    marginBottom: 10,
    borderWidth: 1.2,
    borderRadius: 12,
  },
  descriptionText: {
    fontSize: 14,
    marginVertical: 6,
  },
  dueDateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightActionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: -20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: -6,
    minWidth: 0,
    paddingHorizontal: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TaskListScreen;
