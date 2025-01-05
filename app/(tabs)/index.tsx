import { Link } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
export default function IndexScreen() {
  const theme = useColorScheme() ?? 'dark'

  const persons = [
    {
      name: '赛博佛客',
    },
  ]

  return (
    <PageTabView
      title="聊天"
      rightContent={
        <TouchableOpacity onPress={() => alert('添加好友，开发中...')}>
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
      <Link href={{ pathname: '/login' }}>
        <ThemeText type="link">登录</ThemeText>
      </Link>
    </PageTabView>
  )
}
