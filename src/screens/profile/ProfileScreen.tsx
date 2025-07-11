import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Avatar, Button, List, Text, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { toggleTheme } from '../../store/themeSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useThemeToggle } from '../../hooks/useTheme';

const ProfileScreen = () => {
  const theme = useTheme();
  // const { isDarkMode, isSystemTheme, toggleTheme, toggleSystemTheme } = useThemeToggle();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const isDarkMode = useAppSelector(state => state.theme.isDarkMode);
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Create proper handlers for the Switch components
  // const handleSystemThemeToggle = (value: boolean) => {
  //   toggleSystemTheme();
  // };

  const handleDarkModeToggle = () => {
    const newMode = !localDarkMode;
    setLocalDarkMode(newMode);
    dispatch(toggleTheme());
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.profileContainer}>
        <Avatar.Text
          size={100}
          label={
            user?.name
              ?.split(' ')
              .map(n => n[0])
              .join('') || 'U'
          }
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          color={theme.colors.onPrimary}
        />
        <Text style={[styles.name, { color: theme.colors.onBackground }]}>
          {user?.name}
        </Text>
        <Text style={[styles.email, { color: theme.colors.onBackground }]}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity 
          style={[
            styles.toggleRow,
            { 
              backgroundColor: localDarkMode 
                ? theme.dark ? '#2A2A2A' : '#1E1E1E'
                : theme.colors.surfaceVariant,
            }
          ]}
          onPress={() =>handleDarkModeToggle()}
          activeOpacity={0.8}
        >
          <View style={styles.toggleContent}>
            <MaterialIcons
              name={localDarkMode ? 'dark-mode' : 'light-mode'}
              size={24}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={[
              styles.toggleText,
              { color: localDarkMode ? '#FFFFFF' : theme.colors.onSurface }
            ]}>
              {localDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
          <Switch
            value={localDarkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#79747E', true: '#79747E' }}
            thumbColor={localDarkMode ? theme.colors.primary : '#ffffff'}
          />
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          labelStyle={{ color: theme.colors.onError }}
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
  },
  settingsContainer: {
    marginTop: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    marginLeft: 16,
  },
  icon: {
    marginRight: 8,
  },
  listItem: {
    borderRadius: 8,
    paddingVertical: 8,
    marginVertical: 4,
    elevation: 4,
  },
  // icon: {
  //   marginLeft: 16,
  //   marginRight: 32,
  //   alignSelf: 'center',
  // },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default ProfileScreen;
