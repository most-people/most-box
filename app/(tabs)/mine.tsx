import { StyleSheet } from 'react-native'

import PageTabView from '@/components/PageTabView'
import { ThemeText, ThemeView } from '@/components/Theme'
import { useUserStore } from '@/stores/userStore'
import mp from '@/constants/mp'

export default function MineScreen() {
  const userStore = useUserStore()
  return (
    <PageTabView title="我的">
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">{mp.formatAddress(userStore.wallet?.address)}</ThemeText>
      </ThemeView>
    </PageTabView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
