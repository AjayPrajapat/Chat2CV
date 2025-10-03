import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { RootState } from '@store/store';
import LoginScreen from '@app/Auth/LoginScreen';
import SignupScreen from '@app/Auth/SignupScreen';
import ForgotPasswordScreen from '@app/Auth/ForgotPasswordScreen';
import OnboardingScreen from '@app/Onboarding/OnboardingScreen';
import ChatScreen from '@app/Chat/ChatScreen';
import EditorScreen from '@app/Editor/EditorScreen';
import TemplateGalleryScreen from '@app/Templates/TemplateGalleryScreen';
import ImportScreen from '@app/Import/ImportScreen';
import ExportScreen from '@app/Export/ExportScreen';
import SettingsScreen from '@app/Settings/SettingsScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Chat: undefined;
  Editor: undefined;
  Templates: undefined;
  Settings: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
          Chat: 'chat-bubble-outline',
          Editor: 'edit',
          Templates: 'style',
          Settings: 'settings'
        };
        const iconName = iconMap[route.name] || 'circle';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Editor" component={EditorScreen} />
    <Tab.Screen name="Templates" component={TemplateGalleryScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const RootNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.status === 'authenticated');
  const hasCompletedOnboarding = true; // TODO: Persist onboarding state

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <RootStack.Screen name="Auth">
          {() => (
            <AuthStack.Navigator>
              <AuthStack.Screen name="Login" component={LoginScreen} />
              <AuthStack.Screen name="Signup" component={SignupScreen} />
              <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </AuthStack.Navigator>
          )}
        </RootStack.Screen>
      ) : !hasCompletedOnboarding ? (
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <RootStack.Screen name="Main" component={MainTabs} />
      )}
      <RootStack.Screen name="Import" component={ImportScreen} />
      <RootStack.Screen name="Export" component={ExportScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
