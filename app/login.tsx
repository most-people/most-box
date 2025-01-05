import { ThemeText } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Alert,
} from 'react-native'

const LoginPage = () => {
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const toLogin = () => {}
  const toRegister = () => {}

  const disabled = !username || !password

  const [isRegister, setIsRegister] = useState(false)

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>{isRegister ? '注册账户' : '欢迎登录'}</Text>

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
      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="请再次输入密码"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
      )}

      <TouchableOpacity
        style={[styles.button, disabled ? styles.buttonDisabled : null]}
        onPress={isRegister ? toRegister : toLogin}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{isRegister ? '注册' : '登录'}</Text>
      </TouchableOpacity>
      <ThemeText type="link" onPress={() => setIsRegister(!isRegister)}>
        {isRegister ? '已有账户？去登录' : '没有账户？去注册'}
      </ThemeText>
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
  })
}
export default LoginPage
