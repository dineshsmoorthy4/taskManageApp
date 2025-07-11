import { NavigatorScreenParams } from '@react-navigation/native';
import { Task } from './';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type TasksStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  EditTask: { task: Task };
};

export type MainTabParamList = {
  Tasks: NavigatorScreenParams<TasksStackParamList>;
  Profile: undefined;
  Support: undefined;
};

export type MainStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  EditTask: { task: Task };
};