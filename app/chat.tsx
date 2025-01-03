import { ThemeText, ThemeView } from '@/components/Theme'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function DetailsPage() {
  const navigation = useNavigation()
  const { name } = useLocalSearchParams()

  useEffect(() => {
    navigation.setOptions({
      title: name,
    })
  }, [navigation, name])

  return (
    <ThemeView>
      <ThemeText>Details Page</ThemeText>
    </ThemeView>
  )
}
