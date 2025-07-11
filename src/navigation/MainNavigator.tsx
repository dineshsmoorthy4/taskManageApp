import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from '../screens/tasks/TaskListScreen';
import AddTaskScreen from '../screens/tasks/AddTaskScreen';
import EditTaskScreen from '../screens/tasks/EditTaskScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SupportScreen from '../screens/support/SupportScreen';
// import { MaterialIcons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { MainStackParamList, TasksStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator();
const TasksStack = createStackNavigator<TasksStackParamList>();

const TasksStackNavigator = () => {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen 
        name="TaskList" 
        component={TaskListScreen}
        options={{ title: 'Task Management' }}
      />
      <TasksStack.Screen 
        name="AddTask" 
        component={AddTaskScreen} 
        options={{ title: 'Add Task' }}
      />
      <TasksStack.Screen 
        name="EditTask" 
        component={EditTaskScreen} 
        options={{ title: 'Edit Task' }}
      />
    </TasksStack.Navigator>
  );
};

const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Tasks') {
            iconName = focused ? 'list-alt' : 'list';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Support') {
            iconName = focused ? 'help' : 'help-outline';
          } else {
            iconName = 'help-outline'; // fallback to a valid icon name
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Tasks" component={TasksStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: true }}/>
      <Tab.Screen name="Support" component={SupportScreen} options={{ title: 'Support', headerShown: true }}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;