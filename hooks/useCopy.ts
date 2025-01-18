import { setStringAsync } from 'expo-clipboard'
import { useToast } from 'expo-toast'

export const useCopy = () => {
  const toast = useToast()
  const copy = (text?: string) => {
    if (text) {
      setStringAsync(text)
      toast.show('复制成功')
    }
  }

  return copy
}
