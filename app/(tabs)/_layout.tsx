import { Tabs } from 'expo-router'
import React from 'react'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

// https://www.flaticon.com/free-icon-font/message-star_16866110?page=1&position=3&term=message-star&origin=search&related_id=16866110
import IconChat from '@/assets/icon/chat.svg'
import IconChatActive from '@/assets/icon/chat-active.svg'
// https://www.flaticon.com/free-icon-font/pencil_16861405?term=pencil&related_id=16861405
import IconNote from '@/assets/icon/note.svg'
import IconNoteActive from '@/assets/icon/note-active.svg'
// https://www.flaticon.com/free-icon-font/flag-alt_7661413?page=1&position=2&term=flag&origin=search&related_id=7661413
import IconExplore from '@/assets/icon/explore.svg'
import IconExploreActive from '@/assets/icon/explore-active.svg'
// https://www.flaticon.com/free-icon-font/user_3917711?page=1&position=1&term=user&origin=search&related_id=3917711
import IconMine from '@/assets/icon/mine.svg'
import IconMineActive from '@/assets/icon/mine-active.svg'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      {25}
      <Tabs.Screen
        name="index"
        options={{
          title: '聊天',
          tabBarIcon: ({ color, focused }) =>
            focused ? <IconChatActive fill={color} /> : <IconChat fill={color} />,
        }}
      />

      <Tabs.Screen
        name="note"
        options={{
          title: '笔记',
          tabBarIcon: ({ color, focused }) =>
            focused ? <IconNoteActive fill={color} /> : <IconNote fill={color} />,
        }}
      />
      <Tabs.Screen
        name="pan"
        options={{
          title: '发现',
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <IconExploreActive width={size} height={size} fill={color} />
            ) : (
              <IconExplore width={size} height={size} fill={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="mine"
        options={{
          title: '我',
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <IconMineActive width={size} height={size} fill={color} />
            ) : (
              <IconMine width={size} height={size} fill={color} />
            ),
        }}
      />
    </Tabs>
  )
}
