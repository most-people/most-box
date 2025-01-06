import { Link, router, useRootNavigationState } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
import { useEffect } from 'react'
import { useToast } from 'expo-toast'

export default function IndexScreen() {
  const theme = useColorScheme() ?? 'dark'
  const toast = useToast()

  const persons = [
    {
      name: '赛博佛客',
    },
  ]
  const rootNavigationState = useRootNavigationState()
  useEffect(() => {
    // 确保 Root Layout 已挂载
    if (Platform.OS === 'web' && rootNavigationState?.key) {
      const hash = window.location.hash
      if (hash) {
        router.replace({
          pathname: '/chat',
          params: { name: hash },
        })
      }
    }
  }, [rootNavigationState?.key])
  return (
    <PageTabView
      title="聊天"
      rightContent={
        <TouchableOpacity onPress={() => toast.show('添加好友，开发中...')}>
          <Icon.Add width={20} height={20} fill={Colors[theme].text} />
        </TouchableOpacity>
      }
    >
      {persons.map((person) => (
        <Link
          key={person.name}
          href={{
            pathname: '/chat',
            params: {
              name: person.name,
            },
          }}
        >
          <ThemeText type="link">赛博佛客</ThemeText>
        </Link>
      ))}
    </PageTabView>
  )
}
