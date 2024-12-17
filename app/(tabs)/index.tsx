import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import LeadEventsScreen from '../../components/LeadEventsScreen';
import LeadRepliesScreen from '../../components/LeadRepliesScreen';
import NotificationScreen from '../../components/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Lead Events') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Lead Replies') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen name="Lead Events" component={LeadEventsScreen} />
        <Tab.Screen name="Lead Replies" component={LeadRepliesScreen} />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

