import { ThemeText } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import mp from '@/constants/mp'
import { SvgXml } from 'react-native-svg'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native'
import { Link, router } from 'expo-router'

const LoginPage = () => {
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const toLogin = async () => {
    const wallet = mp.login(username, password)
  }

  const disabled = !username || !password

  const defaultAvatar = mp.avatar()
  const [avatar, setAvatar] = useState(defaultAvatar)

  useEffect(() => {
    if (username && password) {
      setAvatar(mp.avatar(username, password))
    } else {
      setAvatar(defaultAvatar)
    }
  }, [username, password, defaultAvatar])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SvgXml xml={avatar} style={styles.avatar} />
      <Text style={styles.title}>欢迎登录</Text>

      <TextInput
        style={styles.input}
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, disabled ? styles.buttonDisabled : null]}
        onPress={toLogin}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>

      <Link href="/about">
        <ThemeText type="link">去中心化，无需注册，直接登录</ThemeText>
      </Link>
    </KeyboardAvoidingView>
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
    },
  })
}
export default LoginPage
