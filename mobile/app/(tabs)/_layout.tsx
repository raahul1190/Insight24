import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => '🏠',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: () => '🔍',
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: () => '⭐',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => '👤',
        }}
      />
    </Tabs>
  );
}
