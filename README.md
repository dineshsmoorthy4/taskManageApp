# Task Management App

The Task Management App is a comprehensive productivity solution built with React Native that helps users organize their daily tasks efficiently. Designed with a clean, intuitive interface, this application allows users to create, track, and manage their to-do items with ease while offering a personalized experience through customizable themes.

## Features

1. User Authentication System
   
- Secure Login/Signup: Email and password-based authentication with form validation
- Session Management: JWT token storage using AsyncStorage for persistent sessions
- Protected Routes: Automatic redirection to login for unauthorized access
- Logout Functionality: Secure session termination

2. Comprehensive Task Management

- Task Creation: Add tasks with title, description, and due date
- Task Organization: View all tasks in a scrollable list
- Task Modification: Edit existing tasks or mark as complete
- Task Deletion: Remove tasks with confirmation
- Form Validation: Ensures all required fields are properly filled

3. Personalized User Experience

- User Profile: View account information and preferences
- Theme Customization: Toggle between light and dark modes
- System Theme Detection: Optional automatic theme switching based on device settings
- Visual Feedback: Immediate UI updates when changing preferences

4. Technical Implementation

- State Management: Redux Toolkit for efficient global state handling
- Navigation: React Navigation with stack and tab navigators
- UI Components: React Native Paper with Material Design 3 styling
- Form Handling: Formik with Yup validation
- Persistence: AsyncStorage for offline data access
- Type Safety: Comprehensive TypeScript integration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dineshsmoorthy4/taskManageApp.git
   cd taskManageApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Run the application:
   
   For iOS:
   ```bash
   npx react-native run-ios
   ```
   
   For Android:
   ```bash
   npx react-native run-android
   ```

## Project Structure

```
weather-app/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── customStatusBar.tsx
│   │   │   └── ProtectedRoute.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── navigation/
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
|   |   └── RootNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignUpScreen.tsx
│   │   ├── profile/
│   │   │   ├── ProfileScreen.tsx
│   │   ├── support/
│   │   │   ├── SupportScreen.tsx
│   │   ├── tasks/
│   │   │   ├── AddTaskScreen.tsx
│   │   │   └── EditTaskScreen.tsx
│   │   │   └── TaskListScreen.tsx
│   ├── store/
│   │   ├── authSlice.ts
│   │   └── hooks.ts
│   │   └── store.ts
│   │   └── taskSlice.ts
│   │   └── themeSlice.ts
│   ├── types/
│   │   └── index.ts
│   │   └── navigation.ts
│   │   └── theme.ts
│   ├── utils/
│   │   ├── themeUtils.ts
├── App.tsx
├── .env
├── app.json
├── index.js
├── babel.config.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### State Management

- Auth Slice: Handles user authentication state and credentials
- Tasks Slice: Manages task creation, updates, and deletion
- Theme Slice: Controls application theme preferences
- Persisted State: Critical data stored in AsyncStorage

### Development Approach

- Component-Based Architecture: Built with reusable, modular components
- Type Safety: Comprehensive TypeScript integration throughout
- Performance Optimization: Memoization and efficient state updates
- Responsive Design: Adapts to various screen sizes and orientations
- Accessibility: Proper contrast ratios and touch targets

### TypeScript Implementation

- Used TypeScript for all components and services to ensure type safety and better developer experience
- Created dedicated type definitions for API responses, component props, and context states
- Properly typed React Context providers and consumers

### Theme Support

- Created a fully typed ThemeContext for managing dark/light mode preferences
- Used AsyncStorage to persist theme settings
- Applied type-safe theme styles throughout the app

### AsyncStorage

- Used AsyncStorage with TypeScript for type-safe data persistence
- Implemented proper error handling for async operations

### Quality Assurance

- Code Quality: ESLint and Prettier for consistent formatting
- Type Checking: Strict TypeScript configuration
- Testing: Unit tests for critical functionality
- User Experience: Intuitive navigation and clear feedback

## Benefits of TypeScript

- **Type Safety**: Catches common errors during development rather than at runtime
- **Improved IDE Support**: Better autocompletion, type checking, and refactoring capabilities
- **Self-Documenting Code**: Types serve as documentation for component props and function parameters
- **Easier Maintenance**: Type definitions make it easier to understand and refactor code
- **Better Team Collaboration**: Clear interfaces between components and modules

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## License
This project is licensed under the MIT © 2025 License.

## Developed with ❤️ by [Dinesh.Smoorthy](https://www.dineshsmoorthy.com)
