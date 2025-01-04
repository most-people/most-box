import { ThemeText } from '@/components/Theme'

import PageView from '@/components/PageView'
import { useRouter } from 'expo-router'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
export default function HomeScreen() {
  const router = useRouter()
  const theme = useColorScheme() ?? 'light'

  const persons = [
    {
      name: '赛博佛客',
    },
  ]

  return (
    <PageView
      title="聊天"
      rightContent={
        <TouchableOpacity onPress={() => alert('添加好友，开发中...')}>
          <Icon.Add width={20} height={20} fill={Colors[theme].text} />
        </TouchableOpacity>
      }
    >
      {persons.map((person) => (
        <ThemeText
          key={person.name}
          type="link"
          onPress={() =>
            router.push({
              pathname: '/chat',
              params: {
                name: person.name,
              },
            })
          }
        >
          赛博佛客
        </ThemeText>
      ))}
    </PageView>
  )
}
