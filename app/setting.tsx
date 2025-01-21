import PageView from '@/components/PageView'
import { ThemeText, ThemeView } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import { useUserStore } from '@/stores/userStore'
import { useState } from 'react'
import { Switch, TouchableOpacity } from 'react-native'

export default function Web3Page() {
  const { wallet, theme, setItem } = useUserStore()
  const [showMnemonic, setShowMnemonic] = useState(false) // 用于控制密码的显示/隐藏

  return (
    <PageView title={'设置'}>
      <ThemeText type="subtitle">主题</ThemeText>
      <ThemeView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ThemeText>{theme === 'dark' ? '深色' : '浅色'}</ThemeText>
        <Switch
          onValueChange={() => setItem('theme', theme === 'dark' ? 'light' : 'dark')}
          value={theme === 'dark'}
        />
      </ThemeView>
      <ThemeText type="subtitle">令牌过期时间</ThemeText>
      <ThemeText>1天</ThemeText>

      <ThemeText type="subtitle">私钥</ThemeText>
      <ThemeText>任何拥有您助记词的人都可以窃取您账户中的任何资产，切勿泄露！！！</ThemeText>
      {showMnemonic && (
        <ThemeText
          style={{
            color: Colors.tint,
            backgroundColor: Colors[theme].disabled,
            padding: 10,
            fontSize: 16,
            borderRadius: 10,
            fontWeight: 'thin',
            fontStyle: 'italic',
          }}
        >
          {wallet?.mnemonic}
        </ThemeText>
      )}
      <TouchableOpacity onPress={() => setShowMnemonic(!showMnemonic)}>
        <ThemeText type="link">{showMnemonic ? '隐藏' : '显示'}</ThemeText>
      </TouchableOpacity>
    </PageView>
  )
}
