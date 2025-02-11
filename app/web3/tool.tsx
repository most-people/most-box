import { Colors } from '@/constants/Colors'
import mp from '@/constants/mp'
import { SvgXml } from 'react-native-svg'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { useUserStore } from '@/stores/userStore'
import { mostAddress, mostDanger } from '@/constants/MostWallet'
import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

export default function LoginPage() {
  const { theme } = useUserStore()
  const styles = createStyles(theme)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [showMnemonic, setShowMnemonic] = useState(false)

  useEffect(() => {
    if (username && password) {
      const danger = mostDanger(username, password)
      setAddress(danger.address)
      setMnemonic(danger.mnemonic?.phrase || '')
    } else {
      setAddress('')
      setMnemonic('')
    }
  }, [username, password])

  return (
    <PageView title={'Web3'}>
      <SvgXml xml={mp.avatar(mostAddress(username, password))} style={styles.avatar} />

      <ThemeText style={styles.title}>助记词</ThemeText>

      <TextInput
        style={styles.input}
        placeholder="请输入用户名"
        placeholderTextColor="#888"
        maxLength={36}
        value={username}
        onChangeText={setUsername}
        returnKeyType="next"
      />

      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        placeholderTextColor="#888"
        maxLength={100}
        value={password}
        onChangeText={setPassword}
        returnKeyType="next"
      />

      <ThemeText style={styles.title}>ETH 地址：{address}</ThemeText>
      <TouchableOpacity onPress={() => setShowMnemonic(!showMnemonic)}>
        <ThemeText type="link">{showMnemonic ? '隐藏' : '显示'}</ThemeText>
      </TouchableOpacity>
      <ThemeText style={styles.danger}>
        {showMnemonic
          ? mnemonic || ' '
          : '任何拥有您助记词的人都可以窃取您账户中的任何资产，切勿泄露！！！'}
      </ThemeText>
    </PageView>
  )
}

const createStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].background,
      padding: 20,
      gap: 16,
    },
    title: {
      fontSize: 24,
      color: Colors[theme].text,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: Colors[theme].input.border,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 15,
      backgroundColor: Colors[theme].input.background,
      color: Colors[theme].text,
      fontSize: 16,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: Colors.sender,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    buttonDisabled: {
      backgroundColor: Colors[theme].disabled,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    danger: {
      color: Colors.tint,
      backgroundColor: Colors[theme].disabled,
      padding: 10,
      fontSize: 16,
      borderRadius: 10,
      fontWeight: 'thin',
      fontStyle: 'italic',
    },
  })
}
