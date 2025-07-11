import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SupportScreen = () => {
  const theme = useTheme();

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Main Content */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/img/support.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>How Can We Help You Today?</Text>
          <Text style={styles.subtitle}>
            Enter your details to proceed further add more details about your
            bio.
          </Text>

          {/* Search Bar */}
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: theme.colors.surface },
              {borderColor: theme.colors.onBackground}
            ]}
          >
            <MaterialIcons
              name="search"
              size={24}
              color={theme.colors.onBackground}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme.colors.onBackground}
              style={[styles.searchInput, { color: theme.colors.onBackground}]}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 420,
    height: 360,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1.2,
    paddingHorizontal: 12,
    marginBottom: 24,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
});

export default SupportScreen;
