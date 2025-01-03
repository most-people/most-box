import { ThemeText } from '@/components/Theme'
import PageView from '@/components/PageView'
import { useRouter } from 'expo-router'
export default function HomeScreen() {
  const router = useRouter()

  const persons = [
    {
      name: '赛博佛客',
    },
  ]

  return (
    <PageView>
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
