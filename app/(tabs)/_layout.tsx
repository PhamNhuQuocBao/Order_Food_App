import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? Colors.primary.color : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors.primary.color : color,
                fontSize: 10,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="bag-remove-outline"
              size={24}
              color={focused ? Colors.primary.color : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors.primary.color : color,
                fontSize: 10,
              }}
            >
              Bag
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="list-alt"
              size={24}
              color={focused ? Colors.primary.color : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors.primary.color : color,
                fontSize: 10,
              }}
            >
              Order
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? Colors.primary.color : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors.primary.color : color,
                fontSize: 10,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
