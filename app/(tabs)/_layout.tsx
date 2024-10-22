import { Tabs } from 'expo-router'
import React from 'react'

import { Colors } from '@/constants/Colors'

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

// 定义图标组件
const TabIcon: React.FC<{
  focused: boolean
  color: string
  icon: React.ComponentType<any>
  activeIcon: React.ComponentType<any>
  size?: number
}> = ({ focused, color, activeIcon, icon, size = 24 }) => {
  const Icon = focused ? activeIcon : icon
  return <Icon width={size} height={size} fill={color} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '聊天',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} icon={IconChat} activeIcon={IconChatActive} />
          ),
        }}
      />

      <Tabs.Screen
        name="note"
        options={{
          title: '笔记',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} icon={IconNote} activeIcon={IconNoteActive} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: '探索',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon={IconExplore}
              activeIcon={IconExploreActive}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mine"
        options={{
          title: '我',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} icon={IconMine} activeIcon={IconMineActive} />
          ),
        }}
      />
    </Tabs>
  )
}
